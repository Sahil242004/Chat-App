import jwt from "jsonwebtoken";

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const generateAvtar = async () => {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  return `https://avatar.iran.liara.run/public/${randomNumber}`;
};

const createToken = async (id) => {
  try {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    throw new Error("Token creation failed");
  }
};

export { isValidEmail, generateAvtar, createToken };
