const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const connectDB = require("./DB/connect");
require("dotenv").config();

const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");
const adminRoute = require("./routes/admin.routes");

const server = express();
const PORT = process.env.PORT;

connectDB();

const corsOptions = {
    origin: ["https://swift-exit-frontend.vercel.app","http://localhost:3000"], //["http://localhost:8081","http://localhost:3000"]
    optionsSuccessStatus : 200,
    credentials: true //Access-Control-Allow-Credentials : true 
};

server.use(cookieParser());
server.use(cors(corsOptions));
server.use(express.json());
server.use("/api/auth", authRoute);
server.use("/api/user", userRoute);
server.use("/api/admin", adminRoute);

server.listen(PORT,()=>console.log(`Server running on PORT : ${PORT}`));
