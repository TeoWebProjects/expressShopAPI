import express from "express"
import { getProducts, getProductsByCategoty, getProductById } from "../controllers/productController.js"
const router = express.Router()

// GET method route
router.get("/", getProducts)

router.get("/:id", getProductById)
router.get("/category/:id", getProductsByCategoty)

export default router
