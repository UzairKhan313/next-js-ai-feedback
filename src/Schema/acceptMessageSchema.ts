import { z } from "zod";

export const acceptgMessageSchema = z.object({
  acceptMessages: z.boolean(),
});
