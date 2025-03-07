import z from "zod";

export const urlSchema = z.object({
    destination: z.string().url(),
})
