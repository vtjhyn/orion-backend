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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
function getCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield prisma.category.findMany();
            res.status(200).json(categories);
        }
        catch (error) {
            res.status(500).json("Internal Server Error");
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getCategories = getCategories;
function getCategoryById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { categoryId } = req.params;
            const category = yield prisma.category.findUnique({
                where: {
                    id: categoryId,
                },
            });
            if (category) {
                res.json(category);
            }
            else {
                return res.status(404).json("Category not found");
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
exports.getCategoryById = getCategoryById;
function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const { imgUrl, name } = data;
            const category = yield prisma.category.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    imgUrl,
                    name,
                },
            });
            res.status(201).json(category);
        }
        catch (error) {
            res.status(500).json("Internal Server Error");
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.createCategory = createCategory;
function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { categoryId } = req.params;
            const data = req.body;
            const { name } = data;
            const category = yield prisma.category.update({
                where: {
                    id: categoryId,
                },
                data: {
                    name,
                },
            });
            if (category) {
                res.status(200).json(category);
            }
            else {
                res.status(404).json("Category not found");
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
exports.updateCategory = updateCategory;
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { categoryId } = req.params;
            const category = yield prisma.category.delete({
                where: {
                    id: categoryId,
                },
            });
            if (category) {
                res.status(200).json("The category was successfully deleted");
            }
            else {
                res.status(404).json("Category not found");
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
exports.deleteCategory = deleteCategory;
