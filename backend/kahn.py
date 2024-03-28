import os
import mistral_client

from elevenlabs.client import ElevenLabs
from elevenlabs import Voice, VoiceSettings, play, save

from dotenv import load_dotenv

load_dotenv()
ELEVENLABS_API_KEY = os.getenv('ELEVENLABS_API_KEY')
KHAN_VOICE_ID = os.getenv('KHAN_VOICE_ID')

labs_client = ElevenLabs(api_key=ELEVENLABS_API_KEY)

khan_voice = Voice(
    voice_id=KHAN_VOICE_ID,
    settings=VoiceSettings(
        stability=0.71, similarity_boost=0.5, style=0.0, use_speaker_boost=True)
)


def play_speech(speech):
    audio = labs_client.generate(
        text=speech,
        voice=khan_voice,
        model="eleven_multilingual_v2"
    )
    play(audio)


def save_speech(speech, uuid):
    print("Trying to save speech")
    audio = labs_client.generate(
        text=speech,
        voice=khan_voice,
        model="eleven_multilingual_v2"
    )
    save(audio, f'khan-classes/{uuid}-audio.mp3')


def extract_topic(input_prompt):
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
    return mistral_client.chat(few_shot_prompt=few_shot_prompt, model="mistral-large")


def gen_introduction_for_topic(topic):
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
    return mistral_client.chat(few_shot_prompt=few_shot_prompt, model="mistral-small")


def gen_explanation_for_topic(topic, introduction):
    prompt = f"""
    Write a 3-4 sentence explanation of statement of this topic: {topic}
    , given this introductory statement: {introduction}"""
    response = mistral_client.chat(
        few_shot_prompt=prompt, model="mistral-large")
    return response


def gen_conclusion(speech):
    prompt = f"""
    Write a 1 sentence conclusion for the following speech, be friendly:{speech}
    """
    response = mistral_client.chat(
        few_shot_prompt=prompt, model="mistral-small")
    return response


def generate_audio(input_prompt, uuid):
    print("Extracting topic")
    topic = extract_topic(input_prompt)
    print("Extracting topic:", topic)
    speech = ""

    print("Generating intro for topic")
    introduction = gen_introduction_for_topic(topic)
    speech += introduction
    print("Generated intro:", introduction)

    print("Generating explination:", introduction)
    explination = gen_explanation_for_topic(
        topic,
        introduction=introduction
    )
    speech += explination
    print("Generated explination:", explination)

    print("Generating conclusion")
    conclusion = gen_conclusion(speech)
    speech += conclusion
    print("Generated conclusion:", conclusion)

    print("Generating audio")
    save_speech(speech=speech, uuid=uuid)
    print("Generating audio finished")
