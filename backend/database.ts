import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

pool
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err))

export default pool
