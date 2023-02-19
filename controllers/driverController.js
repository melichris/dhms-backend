// import Driver from "../models/driverModel";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const checkDuplicateUsernameOrEmail = (req, res, next) => {
//     // Email
//     Driver.findOne({
//       email: req.body.email
//     }).exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }
//       if (user) {
//         res.status(400).send({ message: "Failed! Email is already in use!" });
//         return;
//       }
//       next();
//     });
//   };

// export const signUp = (req,res)=>{
//     let password = bcrypt.hash(req.body.password, 8, (err,hash)=>{
//         console.log(hash, "pass");
    
        
//         Driver.create({
//             driverName: req.body.driverName,
//             email: req.body.email,
//             bdate: req.body.bdate,
//             password: hash,
//             status: req.body.status,
//             driverImage: req.body.driverImage

//         }).then((data) => {
         
//             res.status(response.CREATED_201);
//             res.json({
//                 success: true,
//                 docs: data
//             });
//         }).catch(err => {
//             res.status(response.BAD_REQUEST_400);
//             res.json({
//                 success: false,
//                 docs: []
//             })
//         })
//     });
 

// }

// export const login = (req,res)=>{

    
//     Driver.findOne({
//         email: req.body.email
//       }).exec((err, user) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }
    
//           if (!user) {
//             return res.status(404).send({ message: "User Not found." });
//           }
    
//           var passwordIsValid = bcrypt.compareSync(
//             req.body.password,
//             user.password
//           );
//           console.log(passwordIsValid);
      
//           console.log(user.password, req.body.password);
      
//           if (!passwordIsValid) {
//             return res.status(401).send({
//               accessToken: null,
//               message: "Invalid Password!"
//             });
//           }
      
//           var token = jwt.sign({ id: user._id, email: user.email }, config.secret, {
//             expiresIn: 86400, // 24 hours
//           });   
      
//           res.status(200).send({
//             accessToken: token,
//           });
//         });
// }