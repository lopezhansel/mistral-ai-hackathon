import { HumanMessage } from "@langchain/core/messages";
import { gpt3 } from "./openai";

export async function sendMessage(prompt: string): Promise<string | undefined> {
  if (process.argv.includes("--dev")) {
    return "What some useful things I can do with the `sed` command in bash?";
  }
  const conversation = [new HumanMessage(prompt)];
  const message = await gpt3.invoke(conversation);

  if (typeof message.content === "string") {
    return message.content;
  }

  console.warn("no message returned:");
  console.warn(message);

  return undefined;
}
