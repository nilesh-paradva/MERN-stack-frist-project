const mongoose = require("mongoose");

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("db is connected");
        console.log("mongodb is connected", conn.connection.host);
    }catch(err){
        console.log("mongodb connect err", err.message);
        process.exit(1); //1 means failure 0 means sucess
    }
}

module.exports = connectDB;