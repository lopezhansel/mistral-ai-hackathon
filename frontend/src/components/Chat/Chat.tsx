import { useState } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./Chat.css";

function Chat() {
  const [messages] = useState([
    {
      username: "You",
      message: "Generate an image of avocado pinata",
    },
  ]);

  return (
    <>
      {messages.map((m) => (
        <ChatMessage message={m} />
      ))}
    </>
  );
}

export default Chat;
