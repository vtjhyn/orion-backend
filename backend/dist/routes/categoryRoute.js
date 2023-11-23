"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const router = express_1.default.Router();
exports.CategoryRoute = router;
router.get("/api/category", categoryController_1.getCategories);
router.get("/api/category/:id", categoryController_1.getCategoryById);
router.post("/api/category", categoryController_1.createCategory);
router.patch("/api/category/:id", categoryController_1.updateCategory);
router.delete("/api/category/:id", categoryController_1.deleteCategory);
