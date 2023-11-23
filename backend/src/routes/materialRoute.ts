import express from "express";
import {
  createMaterial,
  deleteMaterial,
  getMaterialById,
  getMaterials,
  updateMaterial,
} from "../controllers/materialController";

const router = express.Router();

router.get("/api/material", getMaterials);
router.get("/api/material/:id", getMaterialById);
router.post("/api/material", createMaterial);
router.patch("/api/material/:id", updateMaterial);
router.delete("/api/material/:id", deleteMaterial);

export { router as MaterialRoute };
