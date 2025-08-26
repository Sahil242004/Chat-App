import { isValidEmail } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateAvtar, createToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

const signup = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    let profilepic = await generateAvtar();
    let newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      profilepic,
    });

    await newUser.save();
    let token = await createToken(newUser._id);
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    console.log("New user created:", newUser);
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during signup:");
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalide credentials" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    let token = await createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "User signed in successfully",
      user,
    });
  } catch (error) {
    console.error("Error during signin");
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error during logout:");
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    let { profilepic } = req.body;
    console.log("REQ.BODY ===>", req.body.profilepic?.slice(0, 100));
    console.log(typeof profilepic); // should be 'string'
    console.log(profilepic.length); // should be > 1000
    const userId = req.user._id;
    if (!profilepic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    let uploadResponse = await cloudinary.uploader.upload(profilepic);
    // console.log(uploadResponse);
    let updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilepic: uploadResponse.secure_url,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log("error during update profile");
    console.log(error.message);
    // console.error("Error during profile update:");
    // return res.status(500).json({ message: "Internal server error" });
  }
};

const checkAuth = async (req, res) => {
  try {
    // console.log(res);
    res.status(200).json({
      message: "User is authenticated",
      user: req.user,
    });
  } catch (error) {
    console.error("Error during authentication check:");
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { signup, signin, logout, updateProfile, checkAuth };
