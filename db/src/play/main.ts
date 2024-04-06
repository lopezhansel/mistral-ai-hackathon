import { eq } from "drizzle-orm";
import type { SQLiteInsertValue } from "drizzle-orm/sqlite-core";
import { db } from "../db";
import * as schema from "../schema";

async function createUser(values: SQLiteInsertValue<typeof schema.users>) {
  const users = await db.insert(schema.users).values(values).returning();

  return users[0];
}

async function createConveration(
  values: Pick<
    SQLiteInsertValue<typeof schema.conversations>,
    "startedByUserID" | "startedWithUserID"
  >,
) {
  const [conversation] = await db
    .insert(schema.conversations)
    .values(values)
    .returning();

  return conversation;
}

async function createConverationMessage(
  values: SQLiteInsertValue<typeof schema.messages>,
) {
  const [msg] = await db.insert(schema.messages).values(values).returning();

  return msg;
}

(async () => {
  try {
    // "Hi Alice, I need help with my app."
    // await createUser({
    //   userName: "aliceRocks",
    //   email: "aliceRocks@email.com",
    //   firstName: "Alice",
    //   lastName: "Rocks",
    // });
    // await createUser({
    //     userName: "bobRocks",
    //     email: "bobRocks@email.com",
    //     firstName: "Bob",
    //     lastName: "Rocks",
    //   });

    const output: Record<string, unknown> = {};

    const chalie = await createUser({
      userName: "chalie",
      email: "chalieRocks@email.com",
      firstName: "Chalie",
      lastName: "Rocks",
    });
    output.chalie = chalie;

    const bob = await db.query.users.findFirst({
      where: eq(schema.users.userId, 5),
      with: {
        conversations: {
          with: {
            messages: true,
          },
        },
      },
    });
    output.bob = bob;
    const [convo] = Array.isArray(bob?.conversations) ? bob.conversations : [];
    output.convo = convo;

    const convesation = await db.query.conversations.findFirst({
      where: eq(schema.conversations.conversationsId, convo.conversationsId),
      with: {
        messages: true,
        author: true,
      },
    });
    output.convesation = convesation;

    const conversations = await db.query.users.findFirst({
      with: {
        conversations: true,
      },
    });
    output.conversations = conversations;

    console.dir(output, { depth: null });
  } catch (e) {
    console.log(e);
  }
})();
