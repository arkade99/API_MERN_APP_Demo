import { getAllUsers } from "../model/userModel.js";

export const getUserController = (req, res) => {
  //console.log("abc working", req.headers);
  getAllUsers((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};
