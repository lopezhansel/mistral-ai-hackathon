import { trpc } from "@/lib/trpc";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useEffect } from "react";
import Video from "../Video/Video";
import "./ChatMessage.css";

export type Message = {
  status: string;
  animationId: string;
  username: string;
  prompt: string;
  video: string;
  audio: string;
};

function useGetAnimation(animationId: number) {
  const queryClient = useQueryClient();

  const query = trpc.animation.getById.useQuery(animationId, {
    enabled: !!animationId,
  });
  const status = query.data?.status;

  useEffect(() => {
    const animationKey = getQueryKey(
      trpc.animation.getById,
      animationId,
      "query",
    );
    const timeout = setInterval(() => {
      queryClient.invalidateQueries({
        queryKey: animationKey,
      });
    }, 1000);

    if (status === "READY" || status === "ERROR") {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [queryClient, status, animationId]);

  return { query };
}

function ChatMessage({ messageId }: { messageId: number }) {
  const { query } = useGetAnimation(messageId);

  if (!query.data) {
    return null;
  }

  const message = query.data;
  const isReady = message.status === "READY";
  const isPending = message.status === "PENDING";
  const isError = message.status === "ERROR";

  return (
    <div className="chat-message__container flex flex-col gap-3">
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

        {isReady && message.video && message.audio && (
          <Video videoSrc={message.video} audioSrc={message.audio} />
        )}
        {isPending && (
          <p className="chat-message__loading">Generating video...</p>
        )}
        {isError && <p className="chat-message__loading">Failed</p>}
      </div>
    </div>
  );
}

export default ChatMessage;
