"use client";
import { ErrorZod, UserZodSchema } from "@/lib/zodSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as z from "zod";
type TypeUserZodSchema = z.infer<typeof UserZodSchema>;

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errors, setErrors] = useState<TypeUserZodSchema | null>();

  const SginUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      
    try {
        UserZodSchema.parse({name, username, email, password})
        setErrors(null)

        axios.post("/api/user", {
            name,
            username,
            email,
            password,
        }).then(e => {
            if (e.status === 209) {
                console.log(e.data.message);
            }
            if (e.status === 201) {
                router.push('/sign-in')
            }
        }).catch(error => {
            console.log(error.response.data.error.issues[0]);
            
        });    
    } catch (error) {
        setErrors(ErrorZod({error}) as TypeUserZodSchema)
    }
  };
  return (
    <form
      onSubmit={SginUp}
      className="max-w-5xl mx-auto py-10 flex flex-col gap-y-2 [&>input]:p-4 [&>input]:rounded-lg text-black"
    >
      <div>{errors?.name}</div>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <div>{errors?.username}</div>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <div>{errors?.email}</div>
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>{errors?.password}</div>
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="submit"
        className="bg-blue-500 cursor-pointer"
        value="Sgin Up"
      />
    </form>
  );
}
