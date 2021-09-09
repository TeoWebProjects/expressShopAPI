import Product from "../models/productModel.js"

const getProducts = async (req, res) => {
  const products = await Product.find({})
  res.json(products)
}

const getProductsByCategoty = async (req, res) => {
  const products = await Product.find({ category: req.params.id })
  res.json(products)
}

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id)
  res.json(product)
}

export { getProducts, getProductsByCategoty, getProductById }
