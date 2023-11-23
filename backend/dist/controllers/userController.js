"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const exclude_1 = __importDefault(require("../utils/exclude"));
const prisma = new client_1.PrismaClient();
const saltRounds = 10; // Jumlah putaran untuk pembuatan salt
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield prisma.user.findMany({
                include: {
                    role: true,
                },
            });
            const cleanData = (0, exclude_1.default)(users, ["hashedPassword"]);
            return res.status(200).json(cleanData);
        }
        catch (error) {
            return res.status(500).json("Internal Server Error");
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getUsers = getUsers;
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    role: true,
                },
            });
            if (user) {
                const cleanData = (0, exclude_1.default)(user, ["hashedPassword"]);
                res.status(200).json(cleanData);
            }
            else {
                res.status(404).json("User not found");
            }
        }
        catch (error) {
            res.status(500).json("Internal Server Error");
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getUserById = getUserById;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const { name, email, password, roleId } = data;
            const existEmail = yield prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (existEmail !== null) {
                return res.status(400).json({ msg: "Email already exists" });
            }
            const salt = yield bcrypt_1.default.genSalt(saltRounds);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const user = yield prisma.user.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    name,
                    email,
                    hashedPassword,
                    role: {
                        connect: {
                            id: roleId,
                        },
                    },
                },
                include: {
                    role: true,
                },
            });
            const cleanData = (0, exclude_1.default)(user, ["hashedPassword"]);
            res.status(201).json(cleanData);
        }
        catch (error) {
            res.status(500).json("Internal Server Error");
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.createUser = createUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const data = req.body;
            const { name, email, roleId } = data;
            const user = yield prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    name,
                    email,
                    role: {
                        connect: {
                            id: roleId,
                        },
                    },
                },
                include: {
                    role: true,
                },
            });
            if (user) {
                const cleanData = (0, exclude_1.default)(user, ["hashedPassword"]);
                res.status(200).json(cleanData);
            }
            else {
                res.status(404).json("User not found");
            }
        }
        catch (error) {
            res.status(500).json("Internal Server Error");
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const user = yield prisma.user.delete({
                where: {
                    id: userId,
                },
            });
            if (user) {
                res.status(200).json("The user was successfully deleted");
            }
            else {
                res.status(404).json("User not found");
            }
        }
        catch (error) {
            res.status(500).json("Internal Server Error");
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.deleteUser = deleteUser;
