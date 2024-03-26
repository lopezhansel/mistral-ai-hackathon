import pandas as pd
import os
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage


def generate_mistral_response(user_input):
    api_key = os.getenv('MISTRAL_API_KEY')
    model = "mistral-large-latest"
    client = MistralClient(api_key=api_key)
    prompt = f'''You are an expert python developer experienced in using Manim. Given the user query: {
        user_input} generate the Manim code that fulfills the user's request. Please ensure there is no title slide used. Do not use MathTex. Your response should start with "from manim import *" and contain only the code.'''
    messages = [ChatMessage(role="user", content=prompt)]
    chat_response = client.chat(
        model=model,
        messages=messages,
        temperature=0.2
    )
    if chat_response.choices and chat_response.choices[0].message:
        return chat_response.choices[0].message.content
    else:
        return "No completion found or error in the response."


def process_csv(csv_path):
    df = pd.read_csv(csv_path)
    mistral_responses = []
    for instruction in df['instruction']:
        print(instruction)
        mistral_response = generate_mistral_response(instruction)
        print(mistral_response)
        mistral_responses.append(mistral_response)
    df['mistral_response'] = mistral_responses
    df.to_csv('instruction_response_filled.csv', index=False)


if __name__ == "__main__":
    csv_file_path = 'instruction_response.csv'
    process_csv(csv_file_path)
