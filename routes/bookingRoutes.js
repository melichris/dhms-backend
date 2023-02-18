import express from "express"
import { createBooking, getAllBooking, getBooking } from "../controllers/bookingController.js"
import { verifyAdmin, verifyUser } from "../middleware/verifyToken.js"

const router = express.Router()

router.post('/', verifyUser, createBooking)
router.get('/', verifyUser, getAllBooking)
router.get('/:id', verifyAdmin, getBooking)

export default router