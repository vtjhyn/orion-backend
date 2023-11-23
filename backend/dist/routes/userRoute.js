"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
exports.UserRoute = router;
router.get("/api/user", userController_1.getUsers);
router.get("/api/user/:id", userController_1.getUserById);
router.post("/api/user", userController_1.createUser);
router.patch("/api/user/:id", userController_1.updateUser);
router.delete("/api/user/:id", userController_1.deleteUser);
