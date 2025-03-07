import z from "zod";

export const authSchema = z.object({
    email: z.string().email().min(3).max(50),
    password: z.string().min(3).max(150),
})

