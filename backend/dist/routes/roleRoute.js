"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRoute = void 0;
const express_1 = __importDefault(require("express"));
const roleController_1 = require("../controllers/roleController");
const router = express_1.default.Router();
exports.RoleRoute = router;
router.get("/api/role", roleController_1.getRoles);
router.get("/api/role/:id", roleController_1.getRoleById);
router.post("/api/role", roleController_1.createRole);
router.patch("/api/role/:id", roleController_1.updateRole);
router.delete("/api/role/:id", roleController_1.deleteRole);
