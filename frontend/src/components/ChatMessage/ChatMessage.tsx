import { useQuery, useQueryClient } from "@tanstack/react-query";
import "./ChatMessage.css";
import { getAnimation } from "../../services/api";
import { useEffect } from "react";
import Video from "../Video/Video";

export type Message = {
  status: string;
  animationId: string;
  username: string;
  prompt: string;
  video: string;
  audio: string;
};

function useGetAnimation(animationId: string) {
  const queryClient = useQueryClient();
  const query = useQuery<{ message: string }, string, Message>({
    enabled: !!animationId,
    queryKey: ["animations", animationId],
    queryFn: () => getAnimation(animationId),
  });
  const status = query.data?.status;

  useEffect(() => {
    const timeout = setInterval(() => {
      queryClient.invalidateQueries({
        queryKey: ["animations", animationId],
      });
    }, 1000);

    if (status === "READY") {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [queryClient, status, animationId]);

  return { query };
}

function ChatMessage({ messageId }: { messageId: string }) {
  const { query } = useGetAnimation(messageId);

  if (!query.data) {
    return null;
  }

  const message = query.data;
  const isReady = message.status === "READY";

  return (
    <div className="chat-message">
      <p>
        <strong>{message.username}:</strong>
      </p>
      <p>{message.prompt}</p>

      <br />
      <p>
        <strong> Le KhanMistral:</strong>
      </p>

      {isReady && <Video videoSrc={message.video} audioSrc={message.audio} />}
      {!isReady && <p>loading...</p>}
    </div>
  );
}

export default ChatMessage;
