"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialRoute = void 0;
const express_1 = __importDefault(require("express"));
const materialController_1 = require("../controllers/materialController");
const router = express_1.default.Router();
exports.MaterialRoute = router;
router.get("/api/material", materialController_1.getMaterials);
router.get("/api/material/:id", materialController_1.getMaterialById);
router.post("/api/material", materialController_1.createMaterial);
router.patch("/api/material/:id", materialController_1.updateMaterial);
router.delete("/api/material/:id", materialController_1.deleteMaterial);
