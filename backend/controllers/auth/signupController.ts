import { Request, Response } from "express"
import bcrypt from "bcrypt"
import pool from "../../database"

export default async function signupController(req: Request, res: Response) {
  const { username, password, role } = req.body

  //try

  // check if user exists

  // if user exists, return message: user already exists

  // if user does not exist, then new user and insert into database

  //return message user created successfully

  //catch else server error

  try {
    const userExists = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    )

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "user already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
      [username, hashedPassword, role]
    )

    res.status(201).json({ message: "user created successfully" })
  } catch (err) {
    res.status(500).json({ message: "server error" })
  }
}
