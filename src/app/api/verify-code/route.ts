import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { username, code } = await req.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiration) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        { success: true, message: "Account varified successfully." },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verfication code is expired. Please sign up again to get new Activation Code",
        },
        { status: 422 }
      );
    } else {
      return Response.json(
        { success: false, message: "Activatio code is not valid." },
        { status: 422 }
      );
    }
  } catch (error) {
    console.log("Error while checking user name ", error);
    return Response.json(
      { success: false, message: "Error checking username." },
      { status: 500 }
    );
  }
}
