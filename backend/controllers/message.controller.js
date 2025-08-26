import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getSocketId, io } from "../lib/socket.js";

const getUserForSidebar = async (req, res) => {
  try {
    let loggedInUser = req.user;
    let filteredUsers = await User.find({
      _id: { $ne: loggedInUser._id },
    }).select("-password");
    // console.log("printing filtered users");
    // console.log(filteredUsers);
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error fetching users for sidebar:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    let userToChatId = req.params.id;
    let myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    // console.log("text received:", text);
    // console.log("image received:", image);

    let userToChatId = req.params.id;
    let myId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadImage.secure_url;
    }
    let newMessage = new Message({
      senderId: myId,
      receiverId: userToChatId,
      text: text ? text : "Image",
      image: imageUrl,
    });

    await newMessage.save();
    res.status(200).json(newMessage);

    const receiverSocketId = getSocketId(userToChatId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getUserForSidebar, getMessages, sendMessage };
