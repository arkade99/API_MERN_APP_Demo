import express from "express";
import {
  getUserController,
  createUserController,
} from "../controller/userController.js";
import { authController } from "../controller/authController.js";

const router = express.Router();

router.get("/user/list", getUserController);
router.post("/user/create", createUserController);
router.post("/user/login", authController);

export default router;
