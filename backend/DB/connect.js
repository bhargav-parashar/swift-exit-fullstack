const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION_URI);
        console.log("Connected to MongoDB");
    }catch(err){
        console.log("Couldn't connect to DB!");
    }
}

module.exports = connectDB;