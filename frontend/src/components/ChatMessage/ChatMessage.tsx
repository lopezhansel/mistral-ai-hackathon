import "./ChatMessage.css";

type Message = {
  username: string;
  message: string;
};

function ChatMessage({ message }: { message: Message }) {
  return (
    <div className="ChatMessage">
      <p>{message.username}</p>
      <p>{message.message}</p>
    </div>
  );
}

export default ChatMessage;
