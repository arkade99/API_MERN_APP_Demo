import { verifyAuthToken } from "../config/jwt.js";

export const authMiddleware = (req, res, next) => {
  console.log("authMiddleware: ", req.url);
  const authToken = req.headers.authorization;
  console.log("authMiddlewareBody:", authToken);
  if (!authToken) {
    if (req.url === "/api/user/login" || req.url === "/api/user/create") {
      next();
    } else {
      return res.status(403).json({ message: "No token." });
    }
  } else {
    try {
      const decoded = verifyAuthToken(authToken);
      console.log(decoded);
      req.user = decoded;
      console.log(req.user);
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
  }
};
