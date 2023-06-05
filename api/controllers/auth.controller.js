import User from "../models/user.model.js";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hashedPassword = bcrpyt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    const returendUser = await newUser.save();
    res.status(201).send(returendUser);
  } catch (error) {
    next(error)
  }
};

export const login = async (req, res,next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    
    if (!user) return next(createError(404,"User not found"))
    const isCorrect = bcrpyt.compareSync(req.body.password, user.password);
    if (!isCorrect)  return next(createError(400,"Wrong credentials"))
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );
    const { password, ...info } = user._doc;
    res.cookie("accessToken", token, { httpOnly: true }).status(200).send(info);
  } catch (error) {
   createError(error)
  }
};

export const logout = async (req, res) => {
  console.log("req,res",req);
  try {
    res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
    
  } catch (error) {
    console.log(error);
    createError(error);
  }
   
};
