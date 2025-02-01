import z from 'zod';

export const userSchema = z.object({
    name: z.string().min(3).max(150),
    email: z.string().email().min(3).max(150),
})