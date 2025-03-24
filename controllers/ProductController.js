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
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

    try {
        const imagePath = fs.unlinkSync(`ProductImgUpload/${deletedProduct.imagePath}`);
        console.log("Image Path Delete Successfully", imagePath);

        return res.status(200).json({ success: true, message: "Product Deleted Successfully" });
    } catch (err) {
        console.log("delete product err", err.message);
    }
}

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
            const imagePath = fs.unlinkSync(`imageUpload/ProductImgUpload/${product.imagePath}`);
            console.log("Image Path Delete Successfully", imagePath);
        } else {
            console.log("blog Img Not Delete");
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.file ? { imagePath: req.file.filename || null, ...req.body } : req.body);
        return res.status(200).json({ success: true, data: updatedProduct });

    } catch (err) {
        console.log("update product err", err.message);
        return res.status(500).json({ success: false, message: "Product Not Found" });
    }
}


// const UpdateProduct = async (req, res) => {
//     const id = req.params.id;
//     const product = await ProductModel.findById(id);

//     // Check if product and imagePath exist before trying to delete the file
//     if (product && product.imagePath) {
//         const imagePath = path.join(__dirname, '..', 'imageUpload', 'ProductImgUpload', product.imagePath);
//         console.log("update imagePath >>>", imagePath);

//         // Check if the file exists before trying to delete it
//         if (fs.existsSync(imagePath)) {
//             try {
//                 fs.unlinkSync(imagePath);  // Delete the file
//                 console.log("Old image deleted successfully.");
//             } catch (err) {
//                 console.error("Error deleting the image:", err);
//             }
//         } else {
//             console.log("Image file does not exist.");
//         }
//     } else {
//         console.log("No image to delete for this product.");
//     }

//     try {
//         // Update the product
//         const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.file ? { imagePath: req.file.filename || null, ...req.body} : req.body, { new: true });
//         return res.status(200).json({ success: true, data: updatedProduct });
//     } catch (err) {
//         return res.status(500).json({ success: false, message: "Product update failed", error: err.message });
//     }
// };

module.exports = { GetProduct, CreateProduct, DeleteProduct, UpdateProduct, GetSingleProduct }