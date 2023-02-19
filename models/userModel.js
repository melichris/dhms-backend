import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
    },

    role: {
      type: String,
      default: "user",
    },

    // vehicleId:{
    //     type: mongoose.Types.ObjectId,
    //     ref: "Vehicle",
    // }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
