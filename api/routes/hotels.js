import express from "express";
import { createHotelController, deleteHotelController, fetchAllHotelController, fetchHotelDetailController, updateHotelDetailController } from "../controllers/hotel.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// Fetch All hotels
router.get('/',fetchAllHotelController);

// Fetch one hotel details by id
router.get('/:id',fetchHotelDetailController);

// Create new hotel
router.post('/',verifyAdmin,createHotelController);

// Update hotel details by id
router.put('/:id',verifyAdmin,updateHotelDetailController);

// delete hotel details by id
router.delete('/:id',verifyAdmin,deleteHotelController);

export default router;