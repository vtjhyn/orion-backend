import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController";

const router = express.Router();

router.get("/api/product", getProducts);
router.get("/api/product/:id", getProductById);
router.post("/api/product", createProduct);
router.patch("/api/product/:id", updateProduct);
router.delete("/api/product/:id", deleteProduct);

export { router as ProductRoute };
