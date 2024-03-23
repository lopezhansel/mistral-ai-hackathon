import { useState } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatInput from "../ChatInput/ChatInput";
import "./Chat.css";

function Chat() {
  const [messages, setMessage] = useState([
    {
      username: "You",
      message: "Generate an image of avocado pinata",
    },
  ]);

  const handleOnSubumit = (message: string) => {
    setMessage([...messages, { message, username: "You" }]);
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
