import express from "express";
import { deleteUserController, fetchAllUserController, fetchUserDetailController, updateUserDetailController } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();


// Fetch All Users
router.get('/',verifyAdmin,fetchAllUserController);

// Fetch one User details by id
router.get('/:id',verifyUser,fetchUserDetailController);

// Update User details by id
router.put('/:id',verifyUser,updateUserDetailController);

// delete User details by id
router.delete('/:id',verifyUser,deleteUserController);

export default router;