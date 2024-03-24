import csv
import sys
from dotenv import load_dotenv
from openai import OpenAI
import json 

load_dotenv()

client = OpenAI()

def get_prompt(idea):
    prompt=f"""
    You are an expert prompt engineer and python developer, experienced with the Manim package. Your task is to rewrite a user prompt in the given format.

    Here are some examples:
    1. User prompt: "explain gradient descent"
    Rewritten prompt: 
    You are an expert Python developer experienced with the Manim package.You should only give the code delimited by ```, do not give any descriptions or how to run it. Give me Python code that creates a Manim animation with the specifications below:
    title: "Gradient Descent Simplified"
    animation: Start with a title slide with the title, and then animate a conceptual representation of gradient descent by showing a ball rolling down a slope towards the lowest point, indicating the optimization process.
    important note: The code for the animation should be very simple. The animation should have little text if at all. There should not be any use of svgs or external files. 

    2. User prompt: "Explain Newton's First Law"
    Rewritten prompt: 
    You are an expert Python developer experienced with the Manim package.You should only give the code delimited by ```, do not give any descriptions or how to run it. Give me Python code that creates a Manim animation with the specifications below:
    title: "Newton's First Law in Motion"
    animation: Begin with a title slide with the title, then animate a stationary object remaining at rest, and a moving object continuing its motion at a constant velocity in a straight line, unless acted upon by an external force.
    important note: The code for the animation should be very simple. The animation should have little text if at all. There should not be any use of svgs or external files. 

    3. User prompt: "Demonstrate how a lever works"
    Rewritten prompt: 
    You are an expert Python developer experienced with the Manim package.You should only give the code delimited by ```, do not give any descriptions or how to run it. Give me Python code that creates a Manim animation with the specifications below:
    title: "The Principle of the Lever"
    animation: Start with a title slide with the title, and then animate a simple lever in action, showing how a small force applied at one end can lift a heavy weight at the other end, illustrating the concept of mechanical advantage.
    important note: The code for the animation should be very simple. The animation should have little text if at all. There should not be any use of svgs or external files. 

    Now rewrite the foll owing prompt:
    User prompt: "{idea}"
    Rewritten prompt: 
    """
    messages = [{"role": "user", "content": prompt}]
    response = client.chat.completions.create(
        model="gpt-4-0125-preview",
        messages=messages,
        temperature=0)
    return response.choices[0].message.content.strip()

def get_code(refined_prompt):
    messages = [{"role": "user", "content": refined_prompt}]
    response = client.chat.completions.create(
        model="gpt-4-0125-preview",
        messages=messages,
        temperature=0)
    return response.choices[0].message.content.strip()

# prompt= get_prompt('explain gradient descent')
# print(get_code(prompt))
if __name__ == "__main__":
    try:
        if len(sys.argv) < 2:
            raise ValueError("Please provide a CSV file.")
        input_csv_file = sys.argv[1]

        # Read the input CSV file
        with open(input_csv_file, 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            rows = [row for row in reader]

        # Add the new columns
        json_data = []
        for row in rows:
            idea = row['idea']
            print(f"Idea:{idea}")
            refined_prompt = get_prompt(idea)
            code = get_code(refined_prompt)
            json_data.append({
                'instruction': refined_prompt,
                'response' : code,
            })
        # Writing the JSON data to a file
        with open('output.jsonl', 'w') as f:
            for item in json_data:
                f.write(json.dumps(item) + '\n')

    except Exception as e:
        print("An error occurred:", e)
        sys.exit(1)
