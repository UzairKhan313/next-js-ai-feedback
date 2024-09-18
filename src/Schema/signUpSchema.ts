import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(1, "User name must be atleast two charachter long.")
  .max(20, "User name must be nore more then 20 character.")
  .regex(/^[a-zA-Z0-9_]+$/, "User name cannot contain any special character.");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleat 6 character long." }),
});
