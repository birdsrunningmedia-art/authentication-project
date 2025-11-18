import { z } from 'zod'
import { userSchema, loginSchema, registerSchema } from "./schema/schema"

export type User = z.infer<typeof userSchema>
export type Login = z.infer<typeof loginSchema>
export type Register = z.infer<typeof registerSchema>

export type FullUser = {
    id: string;
    email: string;
    name: string;
    role: "user" | "admin"; // or string
};