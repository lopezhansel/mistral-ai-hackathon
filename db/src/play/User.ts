import { eq } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";
import { Conversation } from "./Conversation";
import { Message } from "./Message";

const { users } = schema;
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export class User implements SelectUser {
  static async create(values: InsertUser) {
    const [user] = await db.insert(users).values(values).returning();

    return new User(user);
  }

  static async findUser(userId: SelectUser["userId"]) {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.userId, userId),
      with: {
        conversations: {
          with: {
            messages: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return new User(user);
  }

  constructor(private _user: SelectUser) {}

  get userId() {
    return this._user.userId;
  }

  get createdAt() {
    return this._user.createdAt;
  }

  get email() {
    return this._user.email;
  }

  get firstName() {
    return this._user.firstName;
  }

  get lastName() {
    return this._user.lastName;
  }
  get phone() {
    return this._user.phone;
  }

  get userName() {
    return this._user.userName;
  }

  createConvesation(startedWithUserID: SelectUser["userId"]) {
    return Conversation.create({
      startedByUserID: this.userId,
      startedWithUserID,
    });
  }

  sendMessage(conversationId: number, messageText: Message["messageText"]) {
    return Message.create({
      conversationId,
      messageText,
      userId: this.userId,
    });
  }
}
