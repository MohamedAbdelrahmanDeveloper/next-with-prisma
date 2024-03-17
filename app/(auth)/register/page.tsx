"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { UserZodSchema } from "@/lib/zodSchema";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const SginUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = UserZodSchema.safeParse({name, username, email, password})
    if (!validation.success) {
      return toast({
        description: validation.error.errors[0].message,
        variant: "destructive"
      })
    }

    axios.post("/api/auth/register", {
        name,
        username,
        email,
        password,
    }).then(e => {
        if (!e.data.user) {
          return toast({
            description: e.data.message,
            variant: "destructive"
          })
        }
        toast({
          description: e.data.message
        })
        router.push('/login')
    }).catch(error => {
      if (error?.response?.data) {
        return toast({description: error.response.data.message, variant: 'destructive'});
      }
    });
  };
  return (
    <form onSubmit={SginUp} className="w-full">
      <Card className="max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Welcome !</CardTitle>
          <CardDescription className="text-center text-sm">Create account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Input label="Name"
              placeholder="Enter your name"
              required
              type="text"
              setValue={setName}
            />
            <Input label="Username"
              placeholder="Enter your username"
              required
              type="text"
              setValue={setUsername}
            />
            <Input label="Email"
              placeholder="Enter your email"
              required
              type="email"
              setValue={setEmail}
            />
            <Input label="Password"
              placeholder="Enter your password"
              required
              type="password"
              setValue={setPassword}
            />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link className="block text-center mt-4 text-sm text-blue-500 hover:underline" href="/login">
            Do you have account ?
          </Link>
          <Button className="w-32 text-white bg-blue-500 hover:bg-blue-700">Register</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
