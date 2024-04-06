import { type InsertUser, User } from "./User";

const testUsers: Record<string, InsertUser> = {
  alice: {
    userName: "aliceRocks",
    email: "aliceRocks@email.com",
    firstName: "Alice",
    lastName: "Rocks",
  },
  bob: {
    userName: "bobRocks",
    email: "bobRocks@email.com",
    firstName: "Bob",
    lastName: "Rocks",
  },
  charlie: {
    userName: "chalie",
    email: "chalieRocks@email.com",
    firstName: "Chalie",
    lastName: "Rocks",
  },
  delphi: {
    userName: "Delphi",
    email: "DelphiRocks@email.com",
    firstName: "Delphi",
    lastName: "Rocks",
  },
  echo: {
    userName: "Echo",
    email: "EchoRocks@email.com",
    firstName: "Echo",
    lastName: "Rocks",
  },
};

const testMessage = ["Hey! How it going?", `Hey ! I'm doing good thanks!`];

(async () => {
  testUsers;
  testMessage;
  try {
    const output: Record<string, unknown> = {};

    // const chalie = await User.create(testUsers.chalie);
    // output.chalie = chalie;

    // const delphi = await User.create(testUsers.delphi);
    // output.delphi = delphi;

    // const echo = await User.create(testUsers.echo);
    // output.echo = echo;

    // const convesation = await delphi.createConvesation(echo.userId);
    // output.convesation = convesation;

    // const message1 = await delphi.sendMessage(
    //   convesation.conversationsId,
    //   testMessage[0],
    // );

    // output.message1 = message1;

    // const message2 = await echo.sendMessage(
    //   convesation.conversationsId,
    //   testMessage[1],
    // );
    // output.message2 = message2;
    const user = await User.findUser(7);
    output.user = user;

    console.dir(output, { depth: null });
  } catch (e) {
    console.log(e);
  }
})();
