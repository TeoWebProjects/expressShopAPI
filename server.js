import express from "express"
import dotenv from "dotenv"
import connectDB from "./db.js"
import cron from "node-cron"
import cors from "cors"
import morgan from "morgan"
import checkData from "./cronjobs/fyllianaCron.js"
import productRoutes from "./routes/productRoutes.js"

const app = express()

dotenv.config()

connectDB()

// checkData()
app.use(cors())
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use("/api/products", productRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`)
})
