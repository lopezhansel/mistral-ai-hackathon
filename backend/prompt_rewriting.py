import manim_video
import kahn
import sys




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
        kahn.generate_audio(prompt, uuid)
        print("Generating audio finished")

    except Exception as e:
        print("An error occurred:", e)
        sys.exit(1)
