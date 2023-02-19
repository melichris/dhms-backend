import express from "express"
import { register, login } from "../controllers/authController.js"
const router = express.Router()

router.post("/users/register", register)

router.post("/users/login", login)

export default router