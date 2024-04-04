import { ChatOpenAI } from "@langchain/openai";

export const openai = new ChatOpenAI({
  modelName: "gpt-3.5-turbo-1106",
  temperature: 0.2,
});
