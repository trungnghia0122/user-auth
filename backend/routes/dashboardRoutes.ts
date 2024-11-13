import Router, { Request, Response } from "express"
import authMiddleware from "../middleware/authMiddleware"

interface AuthRequest extends Request {
  user?: any
}

const router = Router()

router.use(
  "/user",
  authMiddleware("user"),
  (req: AuthRequest, res: Response) => {
    res.json({ message: `Welcome, ${req.user.username}! ` })
  }
)

router.use(
  "/admin",
  authMiddleware("admin"),
  (req: AuthRequest, res: Response) => {
    res.json({ message: `Welcome, ${req.user.username}!` })
  }
)

export default router
