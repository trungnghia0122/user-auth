import Router from "express"
import loginController from "../../controllers/auth/loginController"

const router = Router()

router.post("/", loginController as Router.RequestHandler)

export default router
