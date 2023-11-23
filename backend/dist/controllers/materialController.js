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
exports.deleteMaterial = exports.updateMaterial = exports.createMaterial = exports.getMaterialById = exports.getMaterials = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
function getMaterials(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const materials = yield prisma.material.findMany({
                include: {
                    unit: true,
                    products: true,
                },
            });
            res.status(200).json(materials);
        }
        catch (error) {
            res.status(500).json('Internal Server Error');
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getMaterials = getMaterials;
function getMaterialById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { materialId } = req.params;
            const material = yield prisma.material.findUnique({
                where: {
                    id: materialId,
                },
                include: {
                    unit: true,
                    products: true,
                },
            });
            if (material) {
                res.status(200).json(material);
            }
            else {
                return res.status(404).json('Material not found');
            }
        }
        catch (error) {
            res.status(500).json('Internal Server Error');
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getMaterialById = getMaterialById;
function createMaterial(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const { imgUrl, name, quantity, unitId } = data;
            const material = yield prisma.material.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    imgUrl,
                    name,
                    quantity,
                    unit: {
                        connect: {
                            id: unitId,
                        },
                    },
                },
                include: {
                    unit: true,
                    products: true,
                },
            });
            res.status(201).json(material);
        }
        catch (error) {
            res.status(500).json('Internal Server Error');
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.createMaterial = createMaterial;
function updateMaterial(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { materialId } = req.params;
            const data = req.body;
            const { imgUrl, name, quantity, unitId } = data;
            const material = yield prisma.material.update({
                where: {
                    id: materialId,
                },
                data: {
                    imgUrl,
                    name,
                    quantity,
                    unit: {
                        connect: {
                            id: unitId,
                        },
                    },
                },
                include: {
                    unit: true,
                    products: true,
                },
            });
            if (material) {
                res.status(200).json(material);
            }
            else {
                res.status(404).json('Material not found');
            }
        }
        catch (error) {
            res.status(500).json('Internal Server Error');
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.updateMaterial = updateMaterial;
function deleteMaterial(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { materialId } = req.params;
            const material = yield prisma.material.delete({
                where: {
                    id: materialId,
                },
            });
            if (material) {
                res.status(200).json('The material was successfully deleted');
            }
            else {
                return res.status(404).json('Material not found');
            }
        }
        catch (error) {
            res.status(500).json('Internal Server Error');
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.deleteMaterial = deleteMaterial;
