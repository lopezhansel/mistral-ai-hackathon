import os
import sys
import re
import subprocess
import tempfile
import shlex

import openai_client


def generate_animation_instructions(input_prompt):
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
    refined_prompt = openai_client.complete_v4(prompt)
    return refined_prompt


def gen_animation_code(refined_prompt):
    code_string = openai_client.complete_v4(refined_prompt)
    code_pattern = re.compile("```python(.*?)```", re.DOTALL)
    code_match = code_pattern.search(code_string)

    if code_match:
        animation_code = code_match.group(1)
        animation_code = animation_code.replace("ShowCreation", "Create")
        print(animation_code)
    else:
        print("Error: Could not find the code.")
        sys.exit(1)

    return animation_code


def run_manim(uuid, animation_code):
    with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False) as temp_file:
        temp_file.write(animation_code)
        temp_file_path = temp_file.name
    manim_command = f"""manim -o {
        uuid}-video.mp4 --media_dir khan-classes --flush_cache -ql {temp_file_path}"""
    args = shlex.split(manim_command)
    subprocess.run(args, check=True)
    os.remove(temp_file_path)


def generate_video(input_prompt, uuid):
    print("Generating video")
    animation_instructions = generate_animation_instructions(input_prompt)
    print("animation_instructions:", animation_instructions)
    with open(f'./khan-classes/{uuid}-animation-instructions.txt', 'w') as file:
        file.write(animation_instructions)

    max_retries = 3
    for i in range(max_retries):
        try:
            animation_code = gen_animation_code(animation_instructions)

            print("animation_code:", animation_code)
            run_manim(uuid, animation_code)
            with open(f'./khan-classes/{uuid}-animation-code.py', 'w') as file:
                file.write(animation_code)

            # If we reached this point, the code was successful, so break out of the loop
            print("Generating video finished")
            break
        except Exception as e:
            # If there was an exception, add it to the context and retry
            print(f"Error: {e}")
            animation_instructions += f"\n\nAn error occurred: {e}"

    # If we tried all retries and still failed, raise an error
    else:
        print("Error: Failed to generate Manim video after multiple retries.")
        sys.exit(1)
