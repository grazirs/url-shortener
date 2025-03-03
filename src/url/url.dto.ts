import z from "zod";

export const urlSchema = z.object({
    destination: z.string().url(),
    alias: z.string().min(5).nullable().optional(),
})
