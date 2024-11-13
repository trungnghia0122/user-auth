import { Request, Response } from "express"
import bcrypt from "bcrypt"
import pool from "../../database"
import jwt from "jsonwebtoken"

export default async function loginController(req: Request, res: Response) {
  const { username, password, role } = req.body

  try {
    // check if the user exists: if it does return a jwt token
    // if the user does not exist, return user not found

    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ])
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "user not found" })
    }

    const user = result.rows[0]

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(400).json({ message: "incorrect password" })
    }

    const payload = { id: user.id, username: user.username, role: user.role }
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    })
    return res
      .status(200)
      .json({
        token,
        username: user.username,
        role: user.role,
        message: "login success",
      })
  } catch (err) {
    res.status(500).json({ message: "server error" })
  }
}
