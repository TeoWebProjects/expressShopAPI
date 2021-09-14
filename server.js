import express from "express"
import dotenv from "dotenv"
import connectDB from "./db.js"
import cron from "node-cron"
import cors from "cors"
import morgan from "morgan"
import checkData from "./cronjobs/fyllianaCron.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRouter.js"

const app = express()

dotenv.config()

connectDB()

// checkData()
app.use(cors())
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.json())
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`)
})
