import express from "express";
import {
  addUnit,
  deleteUnit,
  getUnitById,
} from "../controllers/unitController";

const router = express.Router();

router.post("/connect-uom", addUnit);
router.get("/connect-uom", getUnitById);
router.delete("/connect-uom", deleteUnit);

export { router as UnitRoute };
