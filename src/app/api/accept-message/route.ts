import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth].ts/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await req.json();

  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessage: acceptMessages,
      },
      { new: true }
    );

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Not Authenticated",
        },
        { status: 401 }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "Message acceptance status updated successfully",
          user,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Failed to updated user messages status. : ", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update user messages status.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        isAcceptingMessage: user.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Getting user Accepting status : ", error);
    return Response.json(
      {
        success: false,
        message: "Error whilte getting user message accepting status.",
      },
      { status: 500 }
    );
  }
}
