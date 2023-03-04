import Vehicle from "../Models/vehicleModel.js";

export const createVehicle = async (req, res) => {
  let data ={
    ...req.body,
    driverId: req.body.userId,
  }
  console.log(req.body.userId)
  const newVehicle = Vehicle(data);
  
    try {
      const savedTour = await newVehicle.save();
  
      res.status(200).json({
        success: true,
        message: "Successfully created",
        data: savedTour,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to create. Try again",
      });
    }
  };

export const getAllVehicle = async (req, res) => {
    // for pagination
  const page = parseInt(req.query.page);
  console.log(page);

  try {
    const vehicles = await Vehicle.find({})
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: vehicles,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// getSingle tour
export const getSingleVehicle = async (req, res) => {
    const id = req.params.id;
    try {
      const vehicle = await Vehicle.findById(id)
      res.status(200).json({
        success: true,
        message: "Successfully searched",
        data: vehicle,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "not found",
      });
    }
  };

  export const updateVehicle = async (req, res) => {
    const id = req.params.id;
    try {
      const updatedVehicle = await Vehicle.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Successfully Updated",
        data: updatedVehicle,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to update. Try again",
      });
    }
  };

export const deleteVehicle = async (req, res) => {
    const id = req.params.id;
    try {
      const deletedTour = await Vehicle.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Successfully deleted",
        data: deletedTour,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to delete. Try again",
      });
    }
};
