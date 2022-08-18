import userModel from "../models/user.js";

export const fetchAllUserController = async (req,res,next)=>{
    try{
        const Users = await userModel.find();
        res.status(200).json(Users);
    }catch(err){
        next(err);
    }
};

export const fetchUserDetailController = async (req,res,next)=>{
    try{
        const UserDetail = await userModel.findById(req.params.id);
        res.status(200).json(UserDetail);
    }catch(err){   
        next(err);
    }
};

// export const createUserController = async (req,res,next)=>{
//     const newUser = new userModel(req.body);
//     try{
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     }catch(err){
//         next(err);
//     }
// };

export const updateUserDetailController = async (req,res,next)=>{
    try{
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{
            new:true
        });
        res.status(200).json(updatedUser);
    }catch(err){
        next(err);
    }
};

export const deleteUserController = async (req,res,next)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted!");
    }catch(err){
        next(err);
    }
};
