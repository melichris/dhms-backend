import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import tourRoute from './routes/tourRoutes.js'
import userRoute from './routes/userRoutes.js'
import authRoute from './routes/authRoutes.js'
import reviewRoute from './routes/reviewRoutes.js'
import bookingRoute from './routes/bookingRoutes.js'
import vehicleRoute from './routes/vehicleRoutes.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000
const corsOptions = {
    origin: true,
    Credentials: true
}

// database connection
mongoose.set('strictQuery', false)
const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDb database connected')
    } catch (error) {
        console.log(`Failed to connect to MongoDb ${error}`)
    }
}

// for testing
app.get("/", (req,res)=>{
    res.send("api working")
} )

// middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

// routes
app.use('/tours', tourRoute)
app.use('/users', userRoute)
app.use('/auth', authRoute)
app.use('/review', reviewRoute)
app.use('/booking', bookingRoute)
app.use('/vehicles', vehicleRoute)

app.listen(port, () =>{
    connect()
    console.log(`server listening on port ${port}`)
})