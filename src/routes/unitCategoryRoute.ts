import express from "express";
import {
  createUnitCategory,
  deleteUnitCategory,
  getUnitCategories,
  getUnitCategoryById,
  updateUnitCategory,
} from "../controllers/unitCategoryController";

const router = express.Router();

router.get("/uom-category", getUnitCategories);
router.get("/uom-category", getUnitCategoryById);
router.post("/uom-category", createUnitCategory);
router.put("/uom-category", updateUnitCategory);
router.delete("/uom-category", deleteUnitCategory);

export { router as UnitCategoryRoute };
