import { Router } from "express"
import * as pingController from "../controllers/ping"
import * as signInController from "../controllers/auth/singInController"
import * as otpController from "../controllers/auth/verifyOTPController"
import * as privateController from "../controllers/privateRoute/privateRouterController"
import { verifyJWT } from "../libs/jwt"

export const mainRouter = Router()

mainRouter.get("/ping", pingController.ping)

mainRouter.post("/auth/signin", signInController.signIn)

mainRouter.post("/auth/signup", signInController.signUp)

mainRouter.post("/auth/verify", otpController.verifyOTPController)

mainRouter.get("/private", verifyJWT, privateController.privateRouter)
