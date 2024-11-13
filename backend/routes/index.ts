import Router from "express"
import authRoutes from "./auth"
import dashboardRoutes from "./dashboardRoutes"

const router = Router()

router.use("/auth", authRoutes)
router.use("/dashboard", dashboardRoutes)

export default router
