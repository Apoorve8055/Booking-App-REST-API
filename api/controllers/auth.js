import bcrypt from "bcrypt";
import userModel from "../models/user.js";
import jwt from 'jsonwebtoken';
import { createError } from "../utils/error.js";

export const signupController = async (req,res,next) => {

    const { username, email, password } = req.body;
    
    try{
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
        const user = new userModel({ username, email, password: hash });
        await user.save();
        res.status(201).json("User account created!");
        
    }catch(err){
        next(err);
    }  
};

export const loginController = async (req,res,next) => {

    try{

        const user = await userModel.findOne({username:req.body.username});
        if(!user) return next(createError(500,"username not found"));

        const isPasswordCorrect = await bcrypt.compareSync(req.body.password,user.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

        const token = jwt.sign({"_id":user._id,isAdmin: user.isAdmin }, process.env.JWTSECRET, { expiresIn: '1d' });
        const {password,isAdmin, ...otherDetails} = user._doc;
       
        res.cookie("access_token",token,{httpOnly: true}).status(200).json({
            deatils: otherDetails,
            isAdmin
        });
    }
    catch(err){
        next(err);
    }
 };