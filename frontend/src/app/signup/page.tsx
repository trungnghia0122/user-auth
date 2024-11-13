"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

import GoogleIcon from "../../../public/google-color-svgrepo-com.svg"
import Image from "next/image"
import { useState } from "react"

import { signup } from "@/services/authService"
import { useUser } from "@/context/UserContext"

const SignupPage = () => {
  const { setUser } = useUser()
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSignUp = async () => {
    try {
      if (!username.trim() && !password.trim()) {
        setError("username and password are required")
        return
      }

      if (!username.trim()) {
        setError("username is required")
        return
      }

      if (!password.trim()) {
        setError("password is required")
        return
      }

      if (username.length < 8) {
        setError("username has to be atleast 8 characters long")
        return
      }

      if (password.length < 11) {
        setError("password has to be atleast 11 characters long")
        return
      }

      const response = await signup(username, password, "user")

      setUser({
        username: response.username,
      })

      router.push("/dashboard/user")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed")
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-slate-100 p-4'>
      <Card className='w-full max-w-[450px] p-4 sm:p-8'>
        <CardHeader className='flex flex-col'>
          <CardTitle className='text-2xl sm:text-4xl font-bold'>
            Sign Up
          </CardTitle>
          <CardDescription>
            Create an account or{" "}
            <a href='/login' className='text-blue-500 hover:underline'>
              login
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-6 sm:gap-10'>
          <div className='flex flex-col gap-2'>
            <Label>Username</Label>
            <Input
              className={`w-full h-10 sm:h-12 text-sm sm:text-base ${
                error === "username and password are required" ||
                error === "username is required" ||
                error === "username has to be atleast 8 characters long" ||
                error === "user already exists"
                  ? "border-red-500"
                  : ""
              }`}
              type='username'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Password</Label>
            <Input
              className={`w-full h-10 sm:h-12 text-sm sm:text-base ${
                error === "username and password are required" ||
                error === "password is required" ||
                error === "password has to be atleast 11 characters long"
                  ? "border-red-500"
                  : ""
              }`}
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Label className='text-red-500'>{error}</Label>
        </CardContent>
        <CardFooter className='flex flex-col justify-center w-full'>
          <Button
            className='w-full h-10 sm:h-12 mt-4 text-sm sm:text-base'
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <div className='w-full flex items-center gap-4 my-4'>
            <div className='flex-1'>
              <Separator />
            </div>
            <span className='text-sm text-gray-500'>or</span>
            <div className='flex-1'>
              <Separator />
            </div>
          </div>
          <Button className='w-full h-10 sm:h-12 text-sm sm:text-base border border-black text-black bg-white hover:bg-black hover:text-white'>
            <div className='flex items-center gap-4'>
              <Image
                src={GoogleIcon}
                alt='Google Icon'
                width={20}
                height={20}
                className='mx-auto'
              />{" "}
              Sign Up with Google
            </div>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignupPage
