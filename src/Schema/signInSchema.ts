import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string(),
  passwrod: z
    .string()
    .min(6, { message: "Password must be atleat 6 character long." }),
});
