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


// const checkDuplicateUsernameOrEmail = (req, res, next) => {
//   // Email
//   User.findOne({
//     email: req.body.email
//   }).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//     if (user) {
//       res.status(400).send({ message: "Failed! Email is already in use!" });
//       return;
//     }
//     next();
//   });
// };

// export const register = (req, res) => {
//   let password = bcrypt.hash(req.body.password, 8, (err, hash) => {
//     // console.log(hash, "pass");


//     User.create({
//       password: hash,
//       email: req.body.email,
//       username: req.body.username,
//       photo: req.body.photo

//     }).then((data) => {

//       res.status(201);
//       res.json({
//         success: true,
//         docs: data
//       });
//     }).catch(err => {
//       res.status(400);
//       res.json({
//         success: false,
//         docs: []
//       })
//     })
//   });
// }

// export const login = (req, res) => {


//   User.findOne({
//     email: req.body.email
//   }).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     if (!user) {
//       return res.status(404).send({ message: "User Not found." });
//     }

//     var passwordIsValid = bcrypt.compareSync(
//       req.body.password,
//       user.password
//     );
//     console.log(passwordIsValid);

//     console.log(user.password, req.body.password);

//     if (!passwordIsValid) {
//       return res.status(401).send({
//         accessToken: null,
//         message: "Invalid Password!"
//       });
//     }

//     var token = jwt.sign({ id: user._id, email: user.email }, process.env.DATABASE_URL, {
//       expiresIn: 86400, // 24 hours
//     });   

//     res.status(200).send({
//       accessToken: token,
//     });
//   });
// }