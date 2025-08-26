import connectdb from "./db.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { config } from "dotenv";
config();

console.log("MONGO_URI from seed.js:", process.env.MONGO_URI);

await connectdb();

// Delete all users
const deleteUsers = async () => {
  try {
    await User.deleteMany({});
    console.log("✅ All users deleted successfully.");
  } catch (error) {
    console.error("❌ Error deleting users:", error);
  }
};

// Delete all messages
const deleteMessages = async () => {
  try {
    await Message.deleteMany({});
    console.log("✅ All messages deleted successfully.");
  } catch (error) {
    console.error("❌ Error deleting messages:", error);
  }
};

// Example runner
const run = async () => {
  // await deleteUsers();
  await deleteMessages();
  process.exit(0); // Exit process once done
};

run();
