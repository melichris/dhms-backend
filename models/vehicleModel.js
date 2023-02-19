import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    vehicleName: {
        type: String,
        require: true
    },
    model: { 
        type: String, 
        require: true, 
    },

    color: { 
        type: String, 
        require: true 
    },

    NoSeat: {
        type: Number,
        require: true
    },

    vehicleImage: {
        type: String,
        require: true
    },

    driverId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },

}, { timestamps: true });

export default mongoose.model("Vehicle", vehicleSchema);
