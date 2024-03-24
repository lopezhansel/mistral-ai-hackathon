import React from "react";
import { Form, Input, TextField } from "react-aria-components";
import { Button } from "@/components/ui/button";

import "./ChatInput.css";

function ChatInput({ onSubmit }: { onSubmit: (m: string) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default browser page refresh.
    e.preventDefault();

    // Get form data as an object.
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Submit to your backend API...
    onSubmit(data.message.toString());
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="chat-input__container flex w-full items-center flex-grow-0"
    >
      <TextField name="message" className="chat-input__text-field">
        <Input
          className="chat-input__text-input"
          placeholder="Explain backpropergation for me"
        />
      </TextField>
      <Button className="chat-input__submit" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ChatInput;
