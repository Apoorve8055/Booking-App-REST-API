import express from "express";
const router = express.Router();

router.get('/',(req,res)=>{
    console.log("users api");
});

export default router;