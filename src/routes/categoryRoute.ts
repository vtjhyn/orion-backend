import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController";

const router = express.Router();

router.get("/category", getCategories);
router.get("/category", getCategoryById);
router.post("/category", createCategory);
router.put("/category", updateCategory);
router.delete("/category", deleteCategory);

export { router as CategoryRoute };
