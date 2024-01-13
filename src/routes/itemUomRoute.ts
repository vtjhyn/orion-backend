import express from "express";
import { addItemUom, deleteItemUom, getItemUomsByItemId } from "../controllers/itemUomController";

const router = express.Router();

router.post("/connect-uom", addItemUom);
router.get("/connect-uom", getItemUomsByItemId);
router.delete("/connect-uom", deleteItemUom);

export { router as UomRoute };
