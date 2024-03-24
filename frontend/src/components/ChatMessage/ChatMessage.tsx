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

    if (status === "READY" || status === "ERROR") {
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
  const isPending = message.status === "PENDING";
  const isError = message.status === "ERROR";

  return (
    <div className="chat-message__container">
      <div className="chat-message__message">
        <p className="chat-message__user">
          <strong>{message.username}:</strong>
        </p>
        <p className="chat-message__prompt">{message.prompt}</p>
      </div>

      <div className="chat-message__message">
        <p className="chat-message__assistant">
          <strong> Le KhanMistral:</strong>
        </p>

        {isReady && <Video videoSrc={message.video} audioSrc={message.audio} />}
        {isPending && <p className="chat-message__loading">loading...</p>}
        {isError && <p className="chat-message__loading">failed</p>}
      </div>
    </div>
  );
}

export default ChatMessage;
