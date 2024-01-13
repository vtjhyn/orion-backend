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
router.get("/uom", getUnitById);
router.post("/uom", createUnit);
router.put("/uom", updateUnit);
router.delete("/uom", deleteUnit);

export { router as UomRoute };
