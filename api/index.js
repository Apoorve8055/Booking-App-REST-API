import express from "express";
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelshRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGOURI);
        console.log(`connected to mongoDB`);
    }catch(err){
        throw err;
    };
};

mongoose.connection.on("disconnected",()=>{
    console.log(`mongodb disconnected!`);
});

mongoose.connection.on("connected",()=>{
    console.log(`mongodb connected!`);
});

// Middlewares
app.use(cookieParser())
app.use(express.json());
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/user",usersRoute);
app.use("/api/v1/hotel",hotelshRoute);
app.use("/api/v1/room",roomsRoute);
app.use((err,req,res,next)=>{
    console.log(err);
    const errMassage = err.message || "Something went wrong!";
    const errStatus = err.status || 500;
    res.status(500).json({
        success: false,
        status: errStatus,
        message: errMassage,
        stack: err.stack
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    connect();
    console.log(`connected to backend : http://localhost:5000`);
});