import { Router } from "express"
import * as pingController from "../controllers/ping"
import * as authController from "../controllers/user/authController"
import { verifyJWT } from "../libs/jwt"

export const mainRouter = Router()

mainRouter.get("/ping", pingController.ping)


mainRouter.post('/auth/signin', authController.signIn)

mainRouter.post('/auth/signup', authController.signUp)

mainRouter.post('/auth/verify', authController.verifyOTP)

mainRouter.get('/private', verifyJWT, authController.test)