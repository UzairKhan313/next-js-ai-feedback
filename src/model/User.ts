import mongoose, { Schema, Document } from "mongoose";
import { Message, MessageSchema } from "./Message";

// User interface.
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiration: Date;
  isAcceptingMessage: boolean;
  isVerified: boolean;
  message: Message[];
}

// User Schema.
const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "User name is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: { type: String, required: [true, "Password is required"] },
  verifyCode: { type: String, required: [true, "Verify code is required"] },
  verifyCodeExpiration: {
    type: Date,
    required: [true, "Verify code expiray is required"],
  },
  isVerified: { type: Boolean, required: true, default: false },
  isAcceptingMessage: { type: Boolean, required: true, default: true },

  message: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
