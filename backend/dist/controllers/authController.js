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
exports.Login = exports.Register = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const exclude_1 = __importDefault(require("../utils/exclude"));
const prisma = new client_1.PrismaClient();
const saltRounds = 10; // Jumlah putaran untuk pembuatan salt
function Register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const { name, email, password } = data;
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
                            id: "419a9c98-6dda-484f-ab7b-333476ded593", //roleId for master
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
            res.status(500).json(`Internal Server Error: ${error}`);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { email, password } = data;
    try {
        const user = yield prisma.user.findFirst({
            where: {
                email,
            },
            include: {
                role: true,
            },
        });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const isCorrectPassword = yield bcrypt_1.default.compare(password, user.hashedPassword);
        if (!isCorrectPassword) {
            return res.status(401).json({ msg: "Incorrect password" });
        }
        if (!process.env.JWT_SECRET) {
            return res
                .status(500)
                .json("Internal Server Error: Secret key not defined");
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        const cleanData = (0, exclude_1.default)(user, ['hashedPassword']);
        res.status(200).json({ token, cleanData });
    }
    catch (error) {
        res.status(500).json("Internal Server Error");
    }
});
exports.Login = Login;
