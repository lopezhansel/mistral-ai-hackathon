import * as schema from "../schema";
import { db } from "../db";

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

    const conversations = await db.query.users.findMany({
      with: {
        conversations: true,
      },
    });
    console.dir(conversations, { depth: null });

    console.log("all users", await db.select().from(schema.users));
  } catch (e) {
    console.log(e);
  }
})();
