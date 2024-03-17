'use client'
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"
import { LoginZodSchema } from "@/lib/zodSchema"

export default function Component() {
  const router = useRouter()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const SginIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validation = LoginZodSchema.safeParse({email, password})
    if (!validation.success) {
      return toast({description: validation.error.errors[0].message, variant: 'destructive'});
    }
    let response = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false
    })
    if (response?.error) {
      return toast({description: response.error, variant: 'destructive'});
    }
    if (response?.ok) {
        router.push('/')
        router.refresh()
    }

  }
  return (
    <form onSubmit={SginIn} className="w-full">
      <Card className="max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Welcome Back!</CardTitle>
          <CardDescription className="text-center text-sm">Please enter your credentials to log in.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <Link className="block text-center mt-4 text-sm text-blue-500 hover:underline" href="/register">
            Create Accouunt ?
          </Link>
          <Button className="w-32 text-white bg-blue-500 hover:bg-blue-700">Login</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

