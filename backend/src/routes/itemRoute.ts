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
router.get("/item/:id", getItemById);
router.post("/item", createItem);
router.patch("/item/:id", updateItem);
router.delete("/item/:id", deleteItem);

export { router as ItemRoute };
