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
import { registerSchema } from "@/schema/schema"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { signUp } from "@/app/auth/core/actions"
import { toast } from "sonner"


export default function SignUpForm() {
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
        resolver: zodResolver(registerSchema)
    })


    async function onSubmit(data: z.infer<typeof registerSchema>) {
        // To do
        const res = await signUp(data)
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
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field
                                        data-invalid={fieldState.invalid}
                                    >
                                        <FieldLabel
                                            htmlFor={field.name}
                                        >
                                            Name
                                        </FieldLabel>
                                        <Input
                                            aria-invalid={fieldState.invalid}
                                            {...field}
                                            id={field.name}
                                            type="text"
                                            placeholder="Name" />
                                        {
                                            fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )
                                        }
                                    </Field>
                                )}
                            />

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
                                Sign Up
                            </Button>

                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

        </>
    )
}
