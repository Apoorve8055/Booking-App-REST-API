import express from "express";
import { createRoomController, deleteRoomController, fetchAllRoomController, fetchRoomDetailController, updateRoomDetailController } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// Fetch All Rooms
router.get('/',fetchAllRoomController);

// Fetch one Room details by id
router.get('/:id',fetchRoomDetailController);

// Create new Room
router.post('/:hotelid',verifyAdmin,createRoomController);

// Update Room details by id
router.put('/:id',verifyAdmin,updateRoomDetailController);

// delete Room details by id
router.delete('/:hotelid/:id',verifyAdmin,deleteRoomController);

export default router;