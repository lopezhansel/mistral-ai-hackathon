import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, TextField } from "react-aria-components";

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
      className="chat-input__container w-full items-center flex-col flex gap-2"
    >
      <TextField name="message" className="chat-input__text-field w-full ">
        <Input
          className="chat-input__text-input w-full"
          placeholder="Enter a topic you would like to know more about"
        />
      </TextField>
      <div className="flex flex-row w-full">
        <Button className="chat-input__submit" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default ChatInput;
