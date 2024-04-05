import "./ChatMessage.css";

export type Message = {
  status: string;
  animationId: string;
  username: string;
  prompt: string;
  video: string;
  audio: string;
};

type Props = {
  message: string;
  username?: string;
};

function ChatMessage({ message, username = "User" }: Props) {
  if (!message) {
    return null;
  }

  return (
    <div className="chat-message__message">
      <p className="chat-message__user">
        <strong>{username}:</strong>
      </p>
      <p className="chat-message__prompt">{message}</p>
    </div>
  );
}

export default ChatMessage;
