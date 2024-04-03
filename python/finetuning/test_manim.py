from manim import *


class ResonancePhenomenon(Scene):
    def construct(self):
        # Title slide
        title = Text("Resonance Phenomenon", font_size=48)
        self.play(Write(title))
        self.wait(2)
        self.play(FadeOut(title))

        # First tuning fork
        fork1 = Line(ORIGIN, UP * 2).shift(LEFT * 2)
        fork1_head = VGroup(
            Line(fork1.get_end(), fork1.get_end() + RIGHT * 0.5),
            Line(fork1.get_end(), fork1.get_end() + LEFT * 0.5)
        )
        tuning_fork1 = VGroup(fork1, fork1_head)

        # Second tuning fork
        fork2 = Line(ORIGIN, UP * 2).shift(RIGHT * 2)
        fork2_head = VGroup(
            Line(fork2.get_end(), fork2.get_end() + RIGHT * 0.5),
            Line(fork2.get_end(), fork2.get_end() + LEFT * 0.5)
        )
        tuning_fork2 = VGroup(fork2, fork2_head)

        self.play(Create(tuning_fork1),  Create(tuning_fork2))
        self.wait(1)

        # Animate first tuning fork vibrating
        for _ in range(4):
            self.play(tuning_fork1.animate.shift(RIGHT * 0.1), run_time=0.1)
            self.play(tuning_fork1.animate.shift(LEFT * 0.2), run_time=0.2)
            self.play(tuning_fork1.animate.shift(RIGHT * 0.1), run_time=0.1)

        self.wait(1)

        # Animate second tuning fork starting to vibrate due to resonance
        for _ in range(4):
            self.play(tuning_fork2.animate.shift(RIGHT * 0.1), run_time=0.1)
            self.play(tuning_fork2.animate.shift(LEFT * 0.2), run_time=0.2)
            self.play(tuning_fork2.animate.shift(RIGHT * 0.1), run_time=0.1)

        self.wait(2)
