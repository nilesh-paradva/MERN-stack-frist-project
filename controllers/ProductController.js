const ProductModel = require("../models/ProductModel");
const fs = require("fs");
const path = require("path");


// get
const GetProduct = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.status(200).json({ success: true, data: products, message: "Product Found" });
    } catch (err) {
        console.log("get all products err", err.message);
        res.status(500).json({ success: false, message: "No Product Found" });
    }
}

// create
const CreateProduct = async (req, res) => {
    const { name, price } = req.body;

    try {
        const newProduct = await ProductModel.create({
            name,
            price,
            imagePath: (req.file) ? req.file.filename : null,
        });

        await newProduct.save();
        console.log("Product Created Successfully", newProduct);

        return res.status(201).json({ message: 'Product Created Successfully' });
    } catch (err) {
        console.log("Error creating product:", err);
        return res.status(500).json({ message: 'Something Went Wrong' });
    }
};

// delete
const DeleteProduct = async (req, res) => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const imagePath = `imageUpload/ProductImgUpload/${deletedProduct.imagePath}`
        console.log("Image Path", imagePath);
        
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log("Image Path Deleted Successfully");
        } else {
            console.log("Image not found at path:", imagePath);
        }

        return res.status(200).json({ success: true, message: "Product Deleted Successfully" });

    } catch (err) {
        console.log("Delete product error:", err.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// get single
const GetSingleProduct = async (req, res) => {
    const product = await ProductModel.findById(req.params.id);

    if (product) {
        return res.status(200).json({ success: true, data: product });
    } else {
        return res.status(500).json({ success: false, message: "Product Not Found" });
    }
}


// update
const UpdateProduct = async (req, res) => {

    try {
        const id = req.params.id;

        const product = await ProductModel.findById(id);
        console.log("Update Product Image Path Get", product.imagePath);

        if (req.file && product.imagePath) {
            const imagePath = `imageUpload/ProductImgUpload/${product.imagePath}`
            console.log("Image Path", imagePath);
            
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log("Image Path Deleted Successfully");
            } else {
                console.log("Image not found at path:", imagePath);
            }

            console.log("Image Path Delete Successfully", imagePath);
        } else {
            console.log("product Img Not Delete");
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.file ? { imagePath: req.file.filename || null, ...req.body } : req.body);
        return res.status(200).json({ success: true, data: updatedProduct });

    } catch (err) {
        console.log("update product err", err.message);
        return res.status(500).json({ success: false, message: "Product Not Found" });
    }
}

module.exports = { GetProduct, CreateProduct, DeleteProduct, UpdateProduct, GetSingleProduct }