const express = require("express");
const ProductRoute = express.Router();
const Multer = require("../middleware/ImgMulter");
const ProductController = require("../controllers/ProductController")


ProductRoute.get("/", ProductController.GetProduct);
ProductRoute.get("/:id", ProductController.GetSingleProduct);
ProductRoute.post("/", Multer.single("imagePath"), ProductController.CreateProduct);
ProductRoute.delete("/:id", ProductController.DeleteProduct);
ProductRoute.put("/:id", Multer.single("imagePath"), ProductController.UpdateProduct);

module.exports = ProductRoute