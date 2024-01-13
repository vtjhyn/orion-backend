import express from "express";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController";

const router = express.Router();

router.get("/item", getItems);
router.get("/item", getItemById);
router.post("/item", createItem);
router.put("/item", updateItem);
router.delete("/item", deleteItem);

export { router as ItemRoute };
