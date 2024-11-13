import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface AuthRequest extends Request {
  user?: any
}

const authMiddleware =
  (requiredRole?: string) =>
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    const token = req.body.token
    if (!token) {
      return res.status(401).json({ message: "No token provided." })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        role: string
      }

      if (requiredRole && decoded.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Acess Denied: Insufficient Permissions" })
      }
      req.user = decoded
      next()
    } catch (error) {
      return res.status(403).json({ message: "Invalid token" })
    }
  }

export default authMiddleware
