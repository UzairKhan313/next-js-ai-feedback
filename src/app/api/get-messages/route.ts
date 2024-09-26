import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth].ts/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

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

  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await UserModel.aggregate([
      { $match: { id: userId } },
      { $unwind: "$messages" }, // unwind operate on array type and return each element in array in the form object.
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", message: { $push: "messages" } } },
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: user[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while Getting User Messages: ", error);
    return Response.json(
      {
        success: false,
        message: "Failed to get user messages.",
      },
      { status: 500 }
    );
  }
}
