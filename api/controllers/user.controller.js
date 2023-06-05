import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    if (req.userId !== user._id.toString())
      return next(createError(403, "You can only delete your account"));

    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    createError(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.status(200).send(user);
  } catch (error) {
    createError(error);
  }
};
