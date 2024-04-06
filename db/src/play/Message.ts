import { db } from "../db";
import * as schema from "../schema";

export type InsertMessage = typeof schema.messages.$inferInsert;
export type SelectMessage = typeof schema.messages.$inferSelect;

export class Message {
  static async create(values: InsertMessage) {
    const [msg] = await db.insert(schema.messages).values(values).returning();

    return new Message(msg);
  }

  constructor(private _message: SelectMessage) {}

  get messageText() {
    return this._message.messageText;
  }
}
