"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitRoute = void 0;
const express_1 = __importDefault(require("express"));
const unitController_1 = require("../controllers/unitController");
const router = express_1.default.Router();
exports.UnitRoute = router;
router.get("/api/unit", unitController_1.getUnits);
router.get("/api/unit/:id", unitController_1.getUnitById);
router.post("/api/unit", unitController_1.createUnit);
router.patch("/api/unit/:id", unitController_1.updateUnit);
router.delete("/api/unit/:id", unitController_1.deleteUnit);
