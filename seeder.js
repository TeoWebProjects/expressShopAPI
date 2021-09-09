import mongoose from "mongoose"
import dotenv from "dotenv"
import Product from "./models/productModel.js"
import connectDB from "./db.js"
import axios from "axios"
import convert from "xml-js"

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Product.deleteMany()
    let products = []
    const res = await axios.get("https://www.fylliana.gr/datafeed/21046/KuikrRyNcw2OYFFqa2hLNlpgSxiLQQlI")

    const xmlData = convert.xml2js(res.data, {
      compact: true,
      spaces: 4,
    })

    const data = xmlData.product_feed.products.product

    data.forEach((p) => {
      if (p.availability._cdata === "Διαθέσιμο") {
        let product = {
          name: p.name._cdata,
          sku: p.sku._cdata,
          image: p.image._cdata,
          category: p.category_id._text,
          brand: "Fylliana",
          description: p.description._cdata,
          price: p.price_ind._text,
          discountPrice: p.price_ind_special._text,
          availability: p.availability._cdata,
          countInStock: p.stock_qty._text,
        }
        products.push(product)
      }
    })

    await Product.insertMany(products)

    console.log("Data Imported!")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany()

    console.log("Data Destroyed!")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
