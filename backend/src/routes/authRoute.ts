import express from "express";
import { Login, Register } from "../controllers/authController";

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);

export { router as AuthRoute };
