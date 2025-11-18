import { z } from 'zod'

export const ROLE_STATUES = ["admin", "user"]

export const userSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
    password: z.string().min(6),
    role: z.enum(ROLE_STATUES).default("user"),
})

export const loginSchema = userSchema.omit({ role: true })
export const registerSchema = userSchema.omit({ role: true })

