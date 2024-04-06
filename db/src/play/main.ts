import { eq } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";

(async () => {
  try {
    // const [alice] = await db
    //   .insert(schema.users)
    //   .values({
    //     userName: "aliceRocks",
    //     email: "aliceRocks@email.com",
    //     firstName: "Alice",
    //     lastName: "Rocks",
    //   })
    //   .returning({
    //     id: schema.users.userId,
    //   });
    // const [bob] = await db
    //   .insert(schema.users)
    //   .values({
    //     userName: "bobRocks",
    //     email: "bobRocks@email.com",
    //     firstName: "Bob",
    //     lastName: "Rocks",
    //   })
    //   .returning({
    //     id: schema.users.userId,
    //   });

    // const { conversations } = schema;
    // const { conversationsId } = conversations;
    // const [conversation] = await db
    //   .insert(schema.conversations)
    //   .values({
    //     startedByUserID: bob.id,
    //     startedWithUserID: alice.id,
    //   })
    //   .returning({
    //     conversationsId,
    //   });

    // conversation.conversationsId;

    // const { messageId } = schema.messages;
    // await db
    //   .insert(schema.messages)
    //   .values({
    //     conversationId: conversation.conversationsId,
    //     userId: alice.id,
    //     messageText: "Hi Bob, how can I assist you?",
    //   })
    //   .returning({
    //     messageId,
    //   });

    // await db
    //   .insert(schema.messages)
    //   .values({
    //     conversationId: conversation.conversationsId,
    //     userId: bob.id,
    //     messageText: "Hi Alice, I need help with my app.",
    //   })
    //   .returning({
    //     messageId,
    //   });

    const output: Record<string, unknown> = {};
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

    db.query.conversations;
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

    // console.log("all users", await db.select().from(schema.users));
  } catch (e) {
    console.log(e);
  }
})();
