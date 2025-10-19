import { generateToken } from "../config/jwt.js";
import { checkUser } from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const authController = async (req, res) => {
  const { userEmail, userPw } = req.body;
  //console.log(req.body);
  try {
    const [existingUser] = await checkUser(userEmail);
    //console.log(existingUser.password);
    if (existingUser.length > 0) {
      const isMatch = await bcrypt.compare(userPw, existingUser[0].password);
      console.log("isMatch", isMatch);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const userData = existingUser[0];
      console.log(userData);
      const token = generateToken(userData);
      console.log("JWT Token: ", token);
      return res.status(200).json({ token });
    }
    res.status(400).json({ message: "No user found!!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
