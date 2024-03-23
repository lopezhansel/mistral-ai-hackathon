import sys
import os
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from mistralai.client import MistralClient
from elevenlabs import Voice, VoiceSettings, play,save
from elevenlabs.client import ElevenLabs
from mistralai.models.chat_completion import ChatMessage

load_dotenv()

labs_client = ElevenLabs(
  api_key=os.getenv('ELEVENLABS_API_KEY'), # Defaults to ELEVEN_API_KEY
)
mistral_client = MistralClient(api_key=os.getenv("MISTRAL_API_KEY"))
khan_voice = Voice(
        voice_id='vuGnhM2Sy53kfr36wFiO',
        settings=VoiceSettings(stability=0.71, similarity_boost=0.5, style=0.0, use_speaker_boost=True)
)
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
        output_topic = get_topic(input_prompt)
        speech = ""
        introduction = get_introduction_topic(output_topic)
        speech += introduction
        speech += get_explanation_topic(output_topic, introduction=introduction)
        speech += get_conclusion_topic(speech)
        print(speech)
        save_speech(speech=speech, uuid=uuid)
    except Exception as e:
        print("An error occurred:", e)
        sys.exit(1)

