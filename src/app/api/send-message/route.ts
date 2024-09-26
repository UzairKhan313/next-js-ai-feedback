import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/Message";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { username, content } = await req.json();
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Not Authenticated",
        },
        { status: 401 }
      );
    }
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User not accepting the message.",
        },
        { status: 403 }
      );
    }

    const messageData = { content, createdAt: new Date() };
    user.messages.push(messageData as Message);
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Message send successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to send  messages to user. : ", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update user messages status.",
      },
      { status: 500 }
    );
  }
}
