import { useEffect, useState } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatInput from "../ChatInput/ChatInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnimation } from "../../services/api";

import "./Chat.css";

function useCreateAnimation() {
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: createAnimation,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["animations"],
      });
    },
  });

  return { mutation };
}

function Chat() {
  const { mutation } = useCreateAnimation();
  const [messageIds, setMessages] = useState<string[]>([]);
  const animationId = mutation?.data?.animationId;

  function updateMessages(id: string) {
    if (messageIds.includes(id)) {
      return;
    }

    setMessages([...messageIds, id]);
  }

  useEffect(() => {
    if (animationId) {
      updateMessages(animationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationId]);

  return (
    <div className="chat__container max-w-7xl w-full m-auto h-screen flex flex-col p-4">
      <div className="chat__messages flex-grow">
        {messageIds.map((id) => (
          <ChatMessage messageId={id} key={id} />
        ))}
      </div>
      <ChatInput onSubmit={mutation.mutate} />
    </div>
  );
}

export default Chat;
