import express from "express"
import dotenv from "dotenv"
import pool from "./database"
import apiRoutes from "./routes"

dotenv.config()
const PORT = process.env.PORT || 3002

const app = express()
const cors = require("cors")

//middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.use(express.json())

app.use("/api", apiRoutes)

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users")
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "error fetching users" })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
