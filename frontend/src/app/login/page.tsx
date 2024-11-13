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
import { useState } from "react"

import { login } from "@/services/authService"
import { useUser } from "@/context/UserContext"

const LoginPage = () => {
  const { setUser } = useUser()
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
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
      const response = await login(username, password)

      setUser({
        username: response.username,
      })

      setUser(response)

      if (response.role === "user") {
        router.push("/dashboard/user")
      } else if (response.role === "admin") {
        router.push("/dashboard/admin")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-slate-100 p-4'>
      <Card className='w-full max-w-[450px] p-4 sm:p-8'>
        <CardHeader className='flex flex-col'>
          <CardTitle className='text-2xl sm:text-4xl font-bold'>
            Log In
          </CardTitle>
          <CardDescription>
            Don't have an account?{" "}
            <a href='/signup' className='text-blue-500 hover:underline'>
              Sign Up
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
                error === "user not found"
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
                error === "incorrect password"
                  ? "border-red-500"
                  : ""
              }`}
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <Label className='text-red-500'>{error}</Label>}
        </CardContent>
        <CardFooter className='flex justify-center w-full'>
          <Button
            className='w-full h-10 sm:h-12 mt-4 text-sm sm:text-base'
            onClick={handleLogin}
          >
            Log In
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage
