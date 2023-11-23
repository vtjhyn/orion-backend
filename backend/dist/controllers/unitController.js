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
exports.deleteUnit = exports.updateUnit = exports.createUnit = exports.getUnitById = exports.getUnits = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
function getUnits(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const units = yield prisma.unit.findMany();
            res.status(200).json(units);
        }
        catch (error) {
            res.status(500).json("Internal Server Error");
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getUnits = getUnits;
function getUnitById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { unitId } = req.params;
            const unit = yield prisma.unit.findUnique({
                where: {
                    id: unitId,
                },
            });
            if (unit) {
                res.status(200).json(unit);
            }
            else {
                return res.status(404).json("Unit not found");
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
exports.getUnitById = getUnitById;
function createUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const { name } = data;
            const unit = yield prisma.unit.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    name,
                },
            });
            res.status(201).json(unit);
        }
        catch (error) {
            res.status(500).json("Internal Server Error");
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.createUnit = createUnit;
function updateUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { unitId } = req.params;
            const data = req.body;
            const { name } = data;
            const unit = yield prisma.unit.update({
                where: {
                    id: unitId,
                },
                data: {
                    name,
                },
            });
            if (unit) {
                res.status(200).json(unit);
            }
            else {
                res.status(400).json("Unit not found");
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
exports.updateUnit = updateUnit;
function deleteUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { unitId } = req.params;
            const unit = yield prisma.unit.delete({
                where: {
                    id: unitId,
                },
            });
            if (unit) {
                res.status(200).json("The unit was successfully deleted");
            }
            else {
                return res.status(404).json("Unit not found");
            }
        }
        catch (error) {
            console.error("Error handling DELETE request:", error);
            res.status(500).json("Internal Server Error");
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.deleteUnit = deleteUnit;
