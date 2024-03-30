import { useEffect, useState } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatInput from "../ChatInput/ChatInput";

import "./Chat.css";
import { trpc } from "@/lib/trpc";

function Chat() {
  const useCreateAnimation = trpc.animation.create.useMutation();
  const [messageIds, setMessages] = useState<number[]>([]);
  const animationId = useCreateAnimation?.data?.animationId;

  function updateMessages(id: number) {
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
      <ChatInput
        onSubmit={(prompt) => {
          useCreateAnimation.mutate({ prompt });
        }}
      />
    </div>
  );
}

export default Chat;
