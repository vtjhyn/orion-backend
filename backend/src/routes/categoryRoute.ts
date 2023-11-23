import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController";

const router = express.Router();

router.get("/api/category", getCategories);
router.get("/api/category/:id", getCategoryById);
router.post("/api/category", createCategory);
router.patch("/api/category/:id", updateCategory);
router.delete("/api/category/:id", deleteCategory);

export { router as CategoryRoute };
