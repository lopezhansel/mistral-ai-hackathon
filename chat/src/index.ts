import { HumanMessage } from "@langchain/core/messages";
import { openai } from "./openai";

export async function sendMessage(prompt: string): Promise<string | undefined> {
  const message = await openai.invoke([new HumanMessage(prompt)]);

  if (typeof message.content === "string") {
    return message.content;
  }

  console.warn("no message returned:");
  console.warn(message);

  return undefined;
}
