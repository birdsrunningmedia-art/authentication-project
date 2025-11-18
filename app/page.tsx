import React from 'react'
import { LogOutButton } from '@/auth/core/components/LogOutButton'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import { getCurrentUser } from '@/auth/core/currentUser'

export default async function Page() {

  // const fullUser: FullUser | null = {
  //   id: "1",
  //   name: "Jane Doe",
  //   email: "jane@example.com",
  //   role: "admin", // try "user" too to see conditional button hide
  // };;

  const fullUser = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true
  })

  if (!fullUser) {
    return ( 
      <div className='container mx-auto p-4'>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    );
  }

  const user = fullUser;

  // fullUser is now NON-null here
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-[500px] mt-4">
        <CardHeader>
          <CardTitle>User: {user.name}</CardTitle>
          <CardDescription>Role: {user.role}</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/private">Private Page</Link>
          </Button>

          {user.role === "admin" && (
            <Button asChild variant="outline">
              <Link href="/admin">Admin Page</Link>
            </Button>
          )}

          <LogOutButton />
        </CardFooter>
      </Card>
    </div>
  );
}