'use server'

import { z } from "zod"
import { loginSchema, registerSchema } from "@/schema/schema"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { usersTable } from "@/drizzle/schema"
import { hashPassword, comparePassword } from "./passwordHasher"
import { redirect } from "next/navigation"
import { createUserSession } from "./session"
import { cookies } from "next/headers"
import { removeUserFromSession } from "./session"

export async function signIn(unsafeData: z.infer<typeof loginSchema>) {
    const parsed = loginSchema.safeParse(unsafeData)
    if (!parsed.success) {
        return { message: "Invalid login data" }
    }
    const data = parsed.data

    let existingUser

    try {
        existingUser = await db.query.usersTable.findFirst({
            where: eq(usersTable.email, data.email),
        })

        if (!existingUser || !existingUser.password) {
            return { message: "Incorrect email or password" }
        }

        const isCorrectPassword = await comparePassword(
            data.password,
            existingUser.password
        )

        if (!isCorrectPassword) {
            return { message: "Incorrect email or password" }
        }

        await createUserSession(
            { id: existingUser.id.toString(), role: existingUser.role },
            await cookies()
        )

    } catch (err) {
        console.error("Sign-in error:", err)
        return { message: "Failed to sign in" }
    }

    // ⛔ redirect must NOT be inside the try/catch
    redirect("/")
}



export async function signUp(unsafeData: z.infer<typeof registerSchema>) {
    const parsed = registerSchema.safeParse(unsafeData)
    if (!parsed.success) {
        return { message: "Invalid form data" }
    }
    const data = parsed.data

    const existingUser = await db.query.usersTable.findFirst({
        where: eq(usersTable.email, data.email),
    })

    if (existingUser) {
        return { message: "Email already in use" }
    }

    let user;

    try {
        const hashedPassword = await hashPassword(data.password)

            ;[user] = await db.insert(usersTable)
                .values({
                    name: data.name,
                    email: data.email,
                    password: hashedPassword,
                })
                .returning({
                    id: usersTable.id,
                    email: usersTable.email,
                    role: usersTable.role,
                    name: usersTable.name
                })

        await createUserSession(
            { id: user.id.toString(), role: user.role },
            await cookies()
        )

    } catch (err) {
        console.error("Signup error:", err)
        return { message: "Failed to create account" }
    }

    // ⛔ IMPORTANT: redirect must be OUTSIDE the try/catch
    redirect("/")
}


export async function logOut() {
    await removeUserFromSession(await cookies())
    redirect("/")
}
