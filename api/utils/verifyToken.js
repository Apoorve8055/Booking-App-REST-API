import { createError } from "./error.js";
import jwt from 'jsonwebtoken';

const verifyToken = (req,res,next) => {
    
    const token = req.cookies.access_token;
    if(!token) return next(createError(401,"You are not authenticated!"));

    jwt.verify(token,process.env.JWTSECRET,(err,info)=>{
        if(err) return next(createError(401,"Token is not vaild!")); 
        req.user = info;
        next();
    });
};

export const verifyUser = (req,res,next) => {
    verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.params.isAdmin){
            next();
        }else{
            return next(createError(403, "You are not authorized!"));
        }
    });
};

export const verifyAdmin = (req,res,next) => {
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return next(createError(403, "You are not authorized!"));
        }
    });

};