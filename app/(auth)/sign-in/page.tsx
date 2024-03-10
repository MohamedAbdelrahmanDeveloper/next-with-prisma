'use client'
import { ErrorZod, LoginZodSchema } from '@/lib/zodSchema'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import * as z from 'zod'
type TypeLoginZodSchema = z.infer<typeof LoginZodSchema>

export default function page() {
    
    const router = useRouter()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [errors, setErrors] = useState<TypeLoginZodSchema|null>();
    const [serverError, setServerError] = useState<string|null>();
    
    const SginUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            LoginZodSchema.parse({email, password})
            setErrors(null)
            let response = await signIn('credentials', {
                email: email,
                password: password,
                redirect: false
            })
    
            if (response?.error) {
                setServerError(response.error);
            }
    
            if (response?.ok) {
                setServerError(null)
                router.push('/')
                router.refresh()
            }        
        } catch (error) {
            setErrors(ErrorZod({error}) as TypeLoginZodSchema)
        }
    }
  return (
    <form onSubmit={SginUp} className='max-w-5xl mx-auto py-10 flex flex-col gap-y-2 [&>input]:p-4 [&>input]:rounded-lg text-black'>
        {serverError && <div className='bg-red-300'>{serverError}</div>}
        <div>{errors?.email}</div>
        <input type="email" placeholder='email' onChange={e => setEmail(e.target.value)}/>
        <div>{errors?.password}</div>
        <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)}/>
        <input type="submit" className='bg-blue-500 cursor-pointer' value='Sgin In'/>
    </form>
  )
}
