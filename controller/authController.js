import { generateToken } from "../config/jwt.js";
import { checkUser, createUser, createUserTry } from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const authController = async (req, res) => {
  const { userEmail, userPw } = req.body;
  //console.log(req.body);
  try {
    const [existingUser] = await checkUser(userEmail);
    //console.log(existingUser.password);
    if (existingUser.length > 0) {
      const isMatch = await bcrypt.compare(userPw, existingUser[0].password);
      //console.log("isMatch", isMatch);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const userData = existingUser[0];
      //console.log(userData);
      const token = generateToken(userData);
      //console.log("JWT Token: ", token);
      return res.status(200).json({ token });
    }
    res.status(400).json({ message: "No user found!!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const createUserController = async (req, res) => {
  const { userName, userEmail, userPw } = req.body;
  //console.log(req.body);
  try {
    //console.log(userEmail, userName, userPw);
    const [existingUser] = await checkUser(userEmail);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "user email already exists" });
    }
    const hasPw = await bcrypt.hash(userPw, 10);
    //console.log(hasPw);
    // createUser({ userName, userEmail, hasPw, userPw }, (err, results) => {
    //   if (err) {
    //     console.log("Error in db");
    //     return res.status(500).json({ error: err.message });
    //   }
    //   console.log("res", results);
    //   const token = generateToken(userData);
    //   return res.status(201).json({ token });
    // });
    const results = await createUserTry({ userName, userEmail, hasPw, userPw });
    //console.log("res", results);
    const userData = results[0];
    const token = generateToken(userData);
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
