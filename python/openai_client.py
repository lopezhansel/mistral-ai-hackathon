from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()


def complete_v4(prompt):
    messages = [{"role": "user", "content": prompt}]
    response = client.chat.completions.create(
        model="gpt-4-0125-preview",
        messages=messages,
        temperature=0)

    return response.choices[0].message.content.strip()


def complete_v3_5(prompt):
    messages = [{"role": "user", "content": prompt}]
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=messages,
        temperature=0)

    return response.choices[0].message.content.strip()
