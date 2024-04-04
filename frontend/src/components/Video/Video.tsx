import { useRef } from "react";
import "./Video.css";

function Video({ videoSrc, audioSrc }: { videoSrc: string; audioSrc: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <>
      {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
      <video
        src={videoSrc}
        width="750"
        height="500"
        controls
        loop
        onPlay={() => {
          audioRef.current?.play();
        }}
        onPause={() => {
          audioRef.current?.pause();
        }}
      >
        Your browser does not support the video tag.
      </video>
      {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
      <audio
        ref={audioRef}
        id="audioPlayer"
        preload="metadata"
        src={audioSrc}
        style={{ display: "none" }}
      >
        Your browser does not support the audio tag.
      </audio>
    </>
  );
}

export default Video;
