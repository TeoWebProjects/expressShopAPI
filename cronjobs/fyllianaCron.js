import Product from "../models/productModel.js"
import axios from "axios"
import convert from "xml-js"

const checkData = async () => {
  try {
    console.time("check")
    const products = await Product.find({})

    const res = await axios.get("https://www.fylliana.gr/datafeed/21046/KuikrRyNcw2OYFFqa2hLNlpgSxiLQQlI")

    const xmlData = convert.xml2js(res.data, {
      compact: true,
      spaces: 4,
    })

    const data = xmlData.product_feed.products.product

    data.forEach((p) => {
      if (p.availability._cdata === "Διαθέσιμο") {
        products.forEach(async (dbp) => {
          if (p.sku._cdata === dbp.sku) {
            if (p.price_ind._text != dbp.price) {
              const doc = await Product.findOne({ sku: dbp.sku })
              doc.price = p.price_ind._text
              await doc.save()
              console.log(`Product with sku:${doc.sku}, Change price from:${dbp.price} => to:${p.price_ind._text}`)
            }

            if (p.price_ind_special._text != dbp.discountPrice) {
              const doc = await Product.findOne({ sku: dbp.sku })
              doc.discountPrice = p.price_ind_special._text
              await doc.save()
              console.log(
                `Product with sku:${doc.sku}, Change discountPrice from:${dbp.discountPrice} => to:${p.price_ind_special._text}`
              )
            }

            if (p.availability._cdata != dbp.availability) {
              const doc = await Product.findOne({ sku: dbp.sku })
              doc.availability = p.availability._cdata
              await doc.save()
              console.log(
                `Product with sku:${doc.sku}, Change availability from:${dbp.availability} => to:${p.availability._cdata}`
              )
            }
          }
        })
      }
    })

    const afterProducts = await Product.find({})

    afterProducts.forEach(async (ap) => {
      if (ap.availability != "Διαθέσιμο") {
        const afterDoc = await Product.findOne({ sku: ap.sku })
        if (afterDoc) {
          await afterDoc.remove()
          console.log(`Product with sku:${ap.sku} Deleted!`)
        }
      }
    })

    data.forEach(async (p) => {
      const avail = await Product.findOne({ sku: p.sku._cdata })
      if (p.availability._cdata === "Διαθέσιμο" && avail === null) {
        let product = new Product({
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
        })

        product.save(function (err, product) {
          if (err) return console.error(err)
          console.log(product.name + " Added to Database.")
        })
      }
    })

    console.log("Check succesfuly end!")
    console.timeEnd("check")
  } catch (error) {
    console.log(error)
  }
}

export default checkData
