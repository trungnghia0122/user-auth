import { Router } from "express"
import { verifyUser } from "../../controllers/auth/verifyController"
import authMiddleware from "../../middleware/authMiddleware"

const router = Router()
router.get("/", authMiddleware(), verifyUser)
