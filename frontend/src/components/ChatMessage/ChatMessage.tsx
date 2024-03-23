import "./ChatMessage.css";

export type Message = {
  username: string;
  message: string;
};

function ChatMessage({ message }: { message: Message }) {
  return (
    <div className="chat-message">
      <p>
        <strong>{message.username}</strong>
      </p>
      <p>{message.message}</p>
    </div>
  );
}

export default ChatMessage;
