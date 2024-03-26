import os

from elevenlabs.client import ElevenLabs
from elevenlabs import Voice, VoiceSettings, play, save

from dotenv import load_dotenv

load_dotenv()

ELEVENLABS_API_KEY = os.getenv('ELEVENLABS_API_KEY')

labs_client = ElevenLabs(api_key=ELEVENLABS_API_KEY)

khan_voice = Voice(
    voice_id=os.getenv('KHAN_VOICE_ID'),
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
