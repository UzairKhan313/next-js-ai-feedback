import { Schema, Document } from "mongoose";

// Messges Interface.
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

export const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
