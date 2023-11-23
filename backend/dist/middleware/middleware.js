"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Authorization token is missing" });
    }
    if (!process.env.JWT_SECRET) {
        return res
            .status(500)
            .json("Internal Server Error: Secret key not defined");
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.userId = decoded.userId;
        next();
    });
    if (!process.env.JWT_SECRET) {
        return res
            .status(500)
            .json("Internal Server Error: Secret key not defined");
    }
};
exports.verifyToken = verifyToken;
