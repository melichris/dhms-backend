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
      imageUrl: req.body.imageUrl,
      role: req.body.role,
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
      error: err
    });
  }
};

// user login
export const login = async (req, res) => {
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).json({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    console.log(passwordIsValid);

    console.log(user.password, req.body.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = jwt.sign({ id: user._id, email: user.email , role: user.role}, process.env.JWT_SECRET_KEY, {
      expiresIn: 86400, // 24 hours
    });   
    
    res.status(200).json({
      status: true,
      accessToken: token,
    });
  });
};