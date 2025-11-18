'use client'
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginSchema } from "@/schema/schema"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { signIn } from "@/auth/core/actions"

export default function SignInForm() {
    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(loginSchema)
    })

    async function onSubmit(data: z.infer<typeof loginSchema>) {
        // To do
        const res = await signIn(data)
        if (res) {
            form.reset()
            toast.error(res.message)
        } 
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Login to your account
                    </CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field
                                        data-invalid={fieldState.invalid}
                                    >
                                        <FieldLabel
                                            htmlFor={field.name}
                                        >
                                            Email
                                        </FieldLabel>
                                        <Input
                                            aria-invalid={fieldState.invalid}
                                            {...field}
                                            id={field.name}
                                            type="email"
                                            placeholder="Email" />
                                        {
                                            fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )
                                        }
                                    </Field>
                                )}
                            />

                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field
                                        data-invalid={fieldState.invalid}
                                    >
                                        <FieldLabel
                                            htmlFor={field.name}
                                        >
                                            Password
                                        </FieldLabel>
                                        <Input
                                            aria-invalid={fieldState.invalid}
                                            {...field}
                                            id={field.name}
                                            type="password"
                                            placeholder="Password" />
                                        {
                                            fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )
                                        }
                                    </Field>
                                )}
                            />
                            <Button
                                type="submit"
                            >
                                Log in
                            </Button>

                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

        </>
    )
}

