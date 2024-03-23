import React from "react";
import { Button, Form, Input, TextField } from "react-aria-components";
import "./ChatInput.css";

function ChatInput({ onSubmit }: { onSubmit: (m: string) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default browser page refresh.
    e.preventDefault();

    // Get form data as an object.
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);

    // Submit to your backend API...
    onSubmit(data.message.toString());
  };

  return (
    <Form onSubmit={handleSubmit} className="chat-input">
      <TextField name="message">
        <Input placeholder="Explain backpropergation for me" />
      </TextField>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default ChatInput;
