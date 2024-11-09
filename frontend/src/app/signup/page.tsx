"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const SignupPage = () => {
  const router = useRouter()

  return (
    <div className='flex justify-center items-center min-h-screen bg-slate-100 p-4'>
      <Card className='w-full max-w-[450px] p-4 sm:p-8'>
        <CardHeader className='flex flex-col'>
          <CardTitle className='text-2xl sm:text-4xl font-bold'>Sign Up</CardTitle>
          <CardDescription>
            Create an account or{" "}
            <a href='/login' className='text-blue-500 hover:underline'>
              login
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-6 sm:gap-10'>
          <div className='flex flex-col gap-2'>
            <Label>Email</Label>
            <Input 
              className='w-full h-10 sm:h-12 text-sm sm:text-base' 
              type='email' 
              placeholder='Email address'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Username</Label>
            <Input
              className='w-full h-10 sm:h-12 text-sm sm:text-base'
              type='username'
              placeholder='Username'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Password</Label>
            <Input
              className='w-full h-10 sm:h-12 text-sm sm:text-base'
              type='password'
              placeholder='Password'
            />
          </div>
        </CardContent>
        <CardFooter className='flex justify-center w-full'>
          <Button
            className='w-full h-10 sm:h-12 mt-4 text-sm sm:text-base'
            onClick={() => {
              router.push("/profile/user")
            }}
          >
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignupPage
