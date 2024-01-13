import express from "express";
import {
  createUnit,
  deleteUnit,
  getUnitById,
  getUnits,
  updateUnit,
} from "../controllers/uomController";

const router = express.Router();

router.get("/uom", getUnits);
router.get("/uom/:id", getUnitById);
router.post("/uom", createUnit);
router.patch("/uom/:id", updateUnit);
router.delete("/uom/:id", deleteUnit);

export { router as UomRoute };
