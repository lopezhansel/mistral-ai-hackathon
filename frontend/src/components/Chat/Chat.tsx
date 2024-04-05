import { trpc } from "@/lib/trpc";
import { useCallback, useEffect, useState } from "react";

import ChatInput from "../ChatInput/ChatInput";
import ChatMessage from "../ChatMessage/ChatMessage";

import "./Chat.css";

function Chat() {
  const useCreateAnimation = trpc.chat.sendMessage.useMutation();
  const [messages, setMessages] = useState<string[]>([]);
  const reply = useCreateAnimation?.data;

  const updateMessages = useCallback(
    function updateMessages(message: string) {
      setMessages([...messages, message]);
    },
    [messages],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (reply) {
      updateMessages(reply);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reply]);

  return (
    <div className="chat__container max-w-7xl w-full m-auto h-screen flex flex-col p-4">
      <div className="chat__messages flex-grow">
        <div className="chat-message__container flex flex-col gap-3">
          {messages.map((msg) => (
            <ChatMessage message={msg} key={msg} />
          ))}
        </div>
      </div>
      <ChatInput
        onSubmit={(message) => {
          useCreateAnimation.mutate(message);
          updateMessages(message);
        }}
      />
    </div>
  );
}

export default Chat;
