import os
import sys
import re
import subprocess
import tempfile
import shlex

from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()


def generate_video(input_prompt, uuid):
    prompt = f"""
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
                code = code.replace("ShowCreation", "Create")
                print(code)
            else:
                print("Error: Could not find the code.")
                sys.exit(1)

            with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False) as temp_file:
                temp_file.write(code)
                temp_file_path = temp_file.name
            manim_command = f"""manim -o {
                uuid}-video.mp4 --media_dir khan-classes -ql {temp_file_path}"""
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
