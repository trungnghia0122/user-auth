const BASE_URL = "http://localhost:3002"

export const signup = async (
  username: string,
  password: string,
  role: string
) => {
  const response = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "sign up failed")
  }

  return data
}

export const login = async (username: string, password: string) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  const data = await response.json()
  localStorage.setItem("token", data.token)
  return data
}
