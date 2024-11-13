import Router from "express"
import signupController from "../../controllers/auth/signupController"

const router = Router()

router.post("/", signupController as Router.RequestHandler)

export default router
