const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const ProductRoute = require("./routes/ProductRoute");
const cors = require('cors');
const path = require("path");
const port = process.env.PORT || 3000;

dotenv.config();

app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "ImageUpload")));
app.use("/api/products", ProductRoute);

app.listen(port, (err) => {
    connectDB();
    if(!err){
        console.log(`Server Is Started In http://localhost:${port}`);
    }
})
