import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateToken = (userData) => {
  return jwt.sign(
    { id: userData.id, email: userData.email }, //payload
    process.env.JWT_SECRET, // secret key
    { expiresIn: "15m" } // token expiry
  );
};

export const verifyAuthToken = (authToken) => {
  // const decode = jwt.verify(authToken, process.env.JWT_SECRET);
  // console.log("decode", decode);
  return jwt.verify(authToken, process.env.JWT_SECRET);
};
