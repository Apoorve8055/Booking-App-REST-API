import express from "express";
import { createHotelController, deleteHotelController, fetchAllHotelController, fetchHotelDetailController, updateHotelDetailController } from "../controllers/hotel.js";
import hotel from "../models/hotel.js";
const router = express.Router();

// Fetch All hotels
router.get('/',fetchAllHotelController);

// Fetch one hotel details by id
router.get('/:id',fetchHotelDetailController);

// Create new hotel
router.post('/',createHotelController);

// Update hotel details by id
router.put('/:id',updateHotelDetailController);

// delete hotel details by id
router.delete('/:id',deleteHotelController);

export default router;