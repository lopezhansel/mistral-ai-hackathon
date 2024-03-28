from mistralai.client import MistralClient
from dotenv import load_dotenv

from mistralai.models.chat_completion import ChatMessage
import os

load_dotenv()


mistral_client = MistralClient(api_key=os.getenv("MISTRAL_API_KEY"))


def chat(few_shot_prompt, model):
    messages = [
        ChatMessage(role="user", content=few_shot_prompt)
    ]
    chat_response = mistral_client.chat(
        model=model,
        messages=messages,
    )
    return chat_response.choices[0].message.content
