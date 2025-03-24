const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        require: true
    },
    price : {
        type : Number,
        require : true
    },
    imagePath : {
        type : String,
        require: true
    }
},{timestamps:true})

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel