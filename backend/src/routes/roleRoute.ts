import express from "express";
import {
  createRole,
  deleteRole,
  getRoleById,
  getRoles,
  updateRole,
} from "../controllers/roleController";

const router = express.Router();

router.get("/api/role", getRoles);
router.get("/api/role/:id", getRoleById);
router.post("/api/role", createRole);
router.patch("/api/role/:id", updateRole);
router.delete("/api/role/:id", deleteRole);

export { router as RoleRoute };
