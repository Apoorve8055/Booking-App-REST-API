import hotelModel from "../models/hotel.js";

export const fetchAllHotelController = async (req,res,next)=>{
    try{
        const hotels = await hotelModel.find();
        res.status(200).json(hotels);
    }catch(err){
        next(err);
    }
};

export const fetchHotelDetailController = async (req,res,next)=>{
    try{
        const hotelDetail = await hotelModel.findById(req.params.id);
        res.status(200).json(hotelDetail);
    }catch(err){   
        next(err);
    }
};
export const createHotelController = async (req,res,next)=>{
    const newHotel = new hotel(req.body);
    try{
        const savedHotel = await newhotelModel.save();
        res.status(201).json(savedHotel);
    }catch(err){
        next(err);
    }
};
export const updateHotelDetailController = async (req,res,next)=>{
    try{
        const updatedHotel = await hotelModel.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{
            new:true
        });
        res.status(200).json(updatedHotel);
    }catch(err){
        next(err);
    }
};
export const deleteHotelController = async (req,res,next)=>{
    try{
        await hotelModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted!");
    }catch(err){
        next(err);
    }
};