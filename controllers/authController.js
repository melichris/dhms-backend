import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// user registration
export const register = async (req, res) => {
  try {
    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });

    console.log(newUser);
    
     await newUser.save();
     console.log(newUser);

    res.status(200).json({
      success: true,
      message: "Successfully Created",
      data: newUser,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
    });
  }
};

// user login
export const login = async (req, res) => {
  const userEmail = req.body.email;
  console.log(userEmail)
  try {
    const user =  user.findOne({ email: userEmail });

    console.log(user)
    // if user doesn't exist
    if (!user) { 
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // if user is existing the password or compare the password
    const checkCorrectPassword = bcrypt.compare(
      req.body.password,
      user.password
    );

    // if password is incorrect
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const { password, role, ...rest } = user._doc;

    // create jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 86400 }
    );

    // set token in the browser
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({ 
        success: true, 
        token,
        message: "succcessfully login", 
        data: { ...rest } ,
        role,
      });
  } catch (error) {
    res.status(500).json({success: false, message: "Failed to login"})
  }
};