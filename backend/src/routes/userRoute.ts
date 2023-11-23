import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/api/user", getUsers);
router.get("/api/user/:id", getUserById);
router.post("/api/user", createUser);
router.patch("/api/user/:id", updateUser);
router.delete("/api/user/:id", deleteUser);

export { router as UserRoute };
