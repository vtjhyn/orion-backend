import express from "express";
import {
  createUnit,
  deleteUnit,
  getUnitById,
  getUnits,
  updateUnit,
} from "../controllers/unitController";

const router = express.Router();

router.get("/api/unit", getUnits);
router.get("/api/unit/:id", getUnitById);
router.post("/api/unit", createUnit);
router.patch("/api/unit/:id", updateUnit);
router.delete("/api/unit/:id", deleteUnit);

export { router as UnitRoute };
