import { generateToken } from "../config/jwt.js";
import { createUser, checkUser, getAllUsers } from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const getUserController = (req, res) => {
  console.log("abc working", req.headers);
  getAllUsers((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

export const createUserController = async (req, res) => {
  const { userName, userEmail, userPw } = req.body;
  console.log(req.body);
  try {
    console.log(userEmail, userName, userPw);
    const [existingUser] = await checkUser(userEmail);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "user email already exists" });
    }
    const hasPw = await bcrypt.hash(userPw, 10);
    console.log(hasPw);
    createUser({ userName, userEmail, hasPw, userPw }, (err, results) => {
      if (err) {
        console.log("Error in db");
        return res.status(500).json({ error: err.message });
      }
      return res
        .status(201)
        .json({ message: "User registered successfully", results });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
