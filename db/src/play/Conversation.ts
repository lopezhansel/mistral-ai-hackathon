import { eq } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";

type SelectConversation = typeof schema.conversations.$inferSelect;
type InsertConversation = typeof schema.conversations.$inferInsert;

export class Conversation implements SelectConversation {
  static async create(
    values: Pick<InsertConversation, "startedByUserID" | "startedWithUserID">,
  ) {
    const [conversation] = await db
      .insert(schema.conversations)
      .values(values)
      .returning();

    return new Conversation(conversation);
  }

  constructor(private _conversation: SelectConversation) {}

  get conversationsId() {
    return this._conversation.conversationsId;
  }

  get conversationsName() {
    return this._conversation.conversationsName;
  }

  get createdAt() {
    return this._conversation.createdAt;
  }

  get startedByUserID() {
    return this._conversation.startedByUserID;
  }

  get startedWithUserID() {
    return this._conversation.startedWithUserID;
  }

  static async findConversation(
    conversationsId: SelectConversation["conversationsId"],
  ) {
    const convo = await db.query.conversations.findFirst({
      where: eq(schema.conversations.conversationsId, conversationsId),
      with: {
        messages: true,
        author: true,
      },
    });

    if (!convo) {
      return null;
    }

    return new Conversation(convo);
  }
}
