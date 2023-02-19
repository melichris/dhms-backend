import express from 'express';
import { verifyDriver } from '../middleware/verifyToken.js';
import { createVehicle, deleteVehicle, getAllVehicle, getSingleVehicle, updateVehicle } from '../controllers/vehicleController.js';

const router = express.Router();

// create new vehicle
router.post("/", createVehicle);

// updater vehicle
router.put("/:id", updateVehicle);

// delete vehicle
router.delete("/:id",deleteVehicle);

// get single vehicle
router.get("/:id", getSingleVehicle);

// get all vehicle
router.get("/", getAllVehicle);

export default router