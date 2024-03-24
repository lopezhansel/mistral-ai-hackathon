import sys
import os
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from mistralai.client import MistralClient
from elevenlabs import Voice, VoiceSettings, play,save
from elevenlabs.client import ElevenLabs
from mistralai.models.chat_completion import ChatMessage
import requests
import re
import subprocess
import tempfile
import shlex
from openai import OpenAI

load_dotenv()

client = OpenAI()

labs_client = ElevenLabs(
  api_key=os.getenv('ELEVENLABS_API_KEY'), # Defaults to ELEVEN_API_KEY
)
mistral_client = MistralClient(api_key=os.getenv("MISTRAL_API_KEY"))
khan_voice = Voice(
        voice_id=os.getenv('KHAN_VOICE_ID'),
        settings=VoiceSettings(stability=0.71, similarity_boost=0.5, style=0.0, use_speaker_boost=True)
)

API_KEY = os.getenv('FIREWORKS_API_KEY')
ACCOUNT_ID = os.getenv('FIREWORKS_ACCOUNT_ID')
MODEL_ID = os.getenv('FIREWORKS_MODEL_ID')

def get_class_name(cls):
    return cls.__name__

def query_response(few_shot_prompt,model):
    messages = [
        ChatMessage(role="user", content=few_shot_prompt)
    ]
    chat_response = mistral_client.chat(
        model=model,
        messages=messages,
    )
    return chat_response.choices[0].message.content

def get_topic(input_prompt):
    few_shot_prompt = f"""
    Identify the main topic from a prompt.

    Here are some examples. 
    
    Prompt: "Explain to me backpropagation"
    Main Topic: "Backpropagation"

    Prompt: "I don't really understand convolutional neural networks"
    Main Topic: "Convolutional Neural Networks"

    Prompt: "Eigenvalues are super confusing"
    Main Topic: "Eigenvalues"

    Here is the real one(Do not use quotes in the real example).
    
    Prompt: "{input_prompt}"
    Main Topic:
    """
    return query_response(few_shot_prompt=few_shot_prompt,model="mistral-large")

def get_video(input_prompt):
    prompt=f"""
    You are an expert prompt engineer and python developer, experienced with the Manim package. Your task is to rewrite a user prompt in the given format.

    Here are some examples:
    1. User prompt: "explain gradient descent"
    Rewritten prompt: 
    You are an expert Python developer experienced with the Manim package.You should only give the code delimited by ```, do not give any descriptions or how to run it. Give me Python code that creates a Manim animation with the specifications below:
    title: "Gradient Descent Simplified"
    animation: Start with a title slide with the title, and then animate a conceptual representation of gradient descent by showing a ball rolling down a slope towards the lowest point, indicating the optimization process.
    important note: The code for the animation should be very simple. The animation should have little text if at all. There should not be any use of svgs or external files. Do not use latex in any way.

    2. User prompt: "Explain Newton's First Law"
    Rewritten prompt: 
    You are an expert Python developer experienced with the Manim package.You should only give the code delimited by ```, do not give any descriptions or how to run it. Give me Python code that creates a Manim animation with the specifications below:
    title: "Newton's First Law in Motion"
    animation: Begin with a title slide with the title, then animate a stationary object remaining at rest, and a moving object continuing its motion at a constant velocity in a straight line, unless acted upon by an external force.
    important note: The code for the animation should be very simple. The animation should have little text if at all. There should not be any use of svgs or external files. Do not use Latex in any way.

    3. User prompt: "Demonstrate how a lever works"
    Rewritten prompt: 
    You are an expert Python developer experienced with the Manim package.You should only give the code delimited by ```, do not give any descriptions or how to run it. Give me Python code that creates a Manim animation with the specifications below:
    title: "The Principle of the Lever"
    animation: Start with a title slide with the title, and then animate a simple lever in action, showing how a small force applied at one end can lift a heavy weight at the other end, illustrating the concept of mechanical advantage.
    important note: The code for the animation should be very simple. The animation should have little text if at all. There should not be any use of svgs or external files. Do not use Latex in any way.

    Now rewrite the foll owing prompt:
    User prompt: "{input_prompt}"
    Rewritten prompt: 
    """
    messages = [{"role": "user", "content": prompt}]
    response = client.chat.completions.create(
        model="gpt-4-0125-preview",
        messages=messages,
        temperature=0)
    refined_prompt = response.choices[0].message.content.strip()
    max_retries = 3
    for i in range(max_retries):
        try:
            messages = [{"role": "user", "content": refined_prompt}]
            response = client.chat.completions.create(
                model="gpt-4-0125-preview",
                messages=messages,
                temperature=0)
            code_string = response.choices[0].message.content.strip()
            code_pattern = re.compile("```python(.*?)```", re.DOTALL)
            code_match = code_pattern.search(code_string)
            if code_match:
                code = code_match.group(1)
                print(code)
            else:
                print("Error: Could not find the code.")
                sys.exit(1)

            with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False) as temp_file:
                temp_file.write(code)
                temp_file_path = temp_file.name
            manim_command = f"manim -o {uuid}-video.mp4 --media_dir khan-classes -ql {temp_file_path}"
            args = shlex.split(manim_command)
            subprocess.run(args, check=True)
            os.remove(temp_file_path)

            # If we reached this point, the code was successful, so break out of the loop
            break
        except Exception as e:
            # If there was an exception, add it to the context and retry
            print(f"Error: {e}")
            refined_prompt += f"\n\nAn error occurred: {e}"

    # If we tried all retries and still failed, raise an error
    else:
        print("Error: Failed to generate Manim video after multiple retries.")
        sys.exit(1)

    return f"{uuid}-video.mp4"
    

def get_introduction_topic(topic):
    few_shot_prompt = f"""

    Write a 1-2 sentence introductory statement for a topic.

    Here are some examples. 
    Prompt: "Backpropogation"
    Response: "Hi I'm Le'chat. Today we'll be learning about backpropogation."

    Prompt: "Convolutional Neural Networks"
    Response: "Hi I'm Le'chat. Today we'll be learning about convolutional neural networks."

    Prompt:"Eigenvalues"
    Response: "Hi I'm Le'chat. Today we'll be learning about eigenvalues"

    Here is the real one(Do not use quotes in the real example).

    Prompt: Write a one sentence introductory statement for the following topic:"{topic}"
    Response:"""
    return query_response(few_shot_prompt=few_shot_prompt,model="mistral-small")

def get_explanation_topic(topic,introduction):
    prompt = f"""
    Write a 3-4 sentence explanation of statement of this topic: {topic}
    , given this introductory statement: {introduction}"""
    response =  query_response(few_shot_prompt=prompt,model="mistral-large")
    return response

def get_conclusion_topic(speech):
    prompt=f"""
    Write a 1 sentence conclusion for the following speech, be friendly:{speech}
    """
    response =  query_response(few_shot_prompt=prompt,model="mistral-small")
    return response

def play_speech(speech):
    audio = labs_client.generate(
    text=speech,
    voice=khan_voice,
    model="eleven_multilingual_v2"
    )
    play(audio)

def save_speech(speech,uuid):
    print("Trying to save speech")
    audio = labs_client.generate(
    text=speech,
    voice=khan_voice,
    model="eleven_multilingual_v2"
    )
    save(audio,f'khan-classes/{uuid}-audio.mp3')
    
if __name__ == "__main__":
    try:
        if len(sys.argv) < 3:
            raise ValueError("Please provide a prompt and a uuid as a command-line argument.")
        input_prompt = sys.argv[1]
        uuid = sys.argv[2]
        get_video(input_prompt)
        output_topic = get_topic(input_prompt)
        speech = ""
        introduction = get_introduction_topic(output_topic)
        speech += introduction
        speech += get_explanation_topic(output_topic, introduction=introduction)
        speech += get_conclusion_topic(speech)
        save_speech(speech=speech, uuid=uuid)
    except Exception as e:
        print("An error occurred:", e)
        sys.exit(1)

