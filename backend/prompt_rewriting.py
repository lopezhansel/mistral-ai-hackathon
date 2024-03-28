import manim_video
import kahn
import sys
import mistral_client


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

    kahn.save_speech(speech=speech, uuid=uuid)


if __name__ == "__main__":
    try:
        if len(sys.argv) < 3:
            raise ValueError(
                "Please provide a prompt and a uuid as a command-line argument.")
        prompt = sys.argv[1]
        uuid = sys.argv[2]
        print("Generating video")
        manim_video.generate_video(prompt, uuid)
        print("Generating video finished")

        print("Generating audio")
        generate_audio(prompt, uuid)
        print("Generating video finished")

    except Exception as e:
        print("An error occurred:", e)
        sys.exit(1)
