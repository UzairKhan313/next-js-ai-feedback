import { resend } from "@/lib/resend";
import VerificationEmailTemplate from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verification Eamil from Next JS AI Website ",
      react: VerificationEmailTemplate({ username, otp: verifyCode }),
    });
    return {
      success: true,
      message: "Verification email send successfully.",
    };
  } catch (emailError) {
    console.log("Error in sending verification email : ", emailError);
    return {
      success: false,
      message: "Falid to send verification email.",
    };
  }
}
