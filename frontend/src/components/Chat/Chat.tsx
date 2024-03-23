import { useState } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatInput from "../ChatInput/ChatInput";
import "./Chat.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAnimation, getAnimation } from "../../services/api";

// Access the client

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

function useGetAnimation() {
  const query = useQuery<{ message: string }, string>({
    queryKey: ["animationss"],
    queryFn: async (string) => {
      string.meta;
      const res = await getAnimation("some");
      return res;
    },
  });

  return { query };
}

function Chat() {
  const { mutation } = useCreateAnimation();
  const [messages, setMessage] = useState([
    {
      username: "You",
      message: "Generate an image of avocado pinata",
    },
  ]);

  const handleOnSubumit = (message: string) => {
    setMessage([...messages, { message, username: "You" }]);
    
    mutation.mutate(message);
  };

  return (
    <div className="chat">
      <div className="chat-messages">
        {messages.map((m) => (
          <ChatMessage message={m} key={m.message} />
        ))}
      </div>
      <ChatInput onSubmit={handleOnSubumit} />
    </div>
  );
}

export default Chat;
