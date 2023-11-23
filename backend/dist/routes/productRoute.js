"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
exports.ProductRoute = router;
router.get("/api/product", productController_1.getProducts);
router.get("/api/product/:id", productController_1.getProductById);
router.post("/api/product", productController_1.createProduct);
router.patch("/api/product/:id", productController_1.updateProduct);
router.delete("/api/product/:id", productController_1.deleteProduct);
