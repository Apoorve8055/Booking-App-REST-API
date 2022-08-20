import hotelModel from '../models/hotel.js';
import roomModel from '../models/room.js'; 

export const createRoomController = async (req,res,next) => {
    const hotelId = req.params.hotelid;

    const newRoom = new roomModel(req.body);

    try{
        // create new room 
        const savedRoom = await newRoom.save();
        try{
         // store new room id in hotel foc
            await hotelModel.findByIdAndUpdate(hotelId,{
                $push: {
                    rooms: savedRoom._id
                }
            });
        }catch(err){
            next(err);
        }
        res.status(201).json(savedRoom);
    }catch(err){
        next(err);
    }
};

export const updateRoomDetailController = async (req,res,next)=>{
    try{
        const updatedRoom = await roomModel.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{
            new:true
        });
        res.status(200).json(updatedRoom);
    }catch(err){
        next(err);
    }
};

export const fetchAllRoomController = async (req,res,next)=>{
    try{
        const room = await roomModel.find();
        res.status(200).json(room);
    }catch(err){
        next(err);
    }
};

export const fetchRoomDetailController = async (req,res,next)=>{
    try{
        const roomDetail = await roomModel.findById(req.params.id);
        res.status(200).json(roomDetail);
    }catch(err){   
        next(err);
    }
};



export const deleteRoomController = async (req,res,next)=>{
    const hotelId = req.params.hotelid;
    try{
        await roomModel.findByIdAndDelete(req.params.id);
        try{
            await hotelModel.findByIdAndUpdate(hotelId,{
                $pull:{
                    rooms:req.params.id
                }
            })
        }catch(err){
            next(err);
        }
        res.status(200).json("Room has been deleted!");
    }catch(err){
        next(err);
    }
};