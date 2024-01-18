import express from "express";
import {
  createItemCategory,
  deleteItemCategory,
  getItemCategories,
  getItemCategoryById,
  updateItemCategory,
} from "../controllers/itemCategoryController";

const router = express.Router();

router.get("/item-category", getItemCategories);
router.get("/item-category", getItemCategoryById);
router.post("/item-category", createItemCategory);
router.put("/item-category", updateItemCategory);
router.delete("/item-category", deleteItemCategory);

export { router as ItemCategoryRoute };
