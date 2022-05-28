const { StatusCodes } = require("http-status-codes");
const { BadRequest, UnAuthenticatedError } = require("../errors");
const User = require("../models/user.mode");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Email and Password Feild is Required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthenticatedError("Your Account is Not Found");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    console.log("password is ", user.password);
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  return res.status(StatusCodes.OK).json({
    user: { name: user.name, avatar: user.avatar, email: user.email },
    token,
  });
};

const registerController = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    throw new BadRequest("Name, Email and Password Feild is Required");
  }
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  return res.status(StatusCodes.OK).json({
    user: { name: user.name, avatar: user.avatar, email: user.email },
    token,
  });
};

module.exports = { loginController, registerController };
