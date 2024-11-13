"use client"

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"

interface User {
  username: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/auth")

        if (response.ok) {
          const userData = await response.json()
          setUser(userData.username)
        }
      } catch (error) {
        console.error("Session verication failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("userUser must be used within a UserProvider")
  }
  return context
}
