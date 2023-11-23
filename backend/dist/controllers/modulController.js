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
exports.deleteModule = exports.updateModule = exports.createModule = exports.getModuleByUser = exports.getModules = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
function getModules(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const modules = yield prisma.moduleItem.findMany({
                include: {
                    roles: true,
                }
            });
            res.status(200).json(modules);
        }
        catch (error) {
            res.status(500).json("Internal Server Error");
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getModules = getModules;
function getModuleByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { roleId } = req.params;
            const modules = yield prisma.moduleList.findMany({
                where: {
                    roleId,
                },
                include: {
                    modules: true,
                }
            });
            if (modules) {
                res.status(200).json(modules);
            }
            else {
                return res.status(404).json("Modules not found");
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
exports.getModuleByUser = getModuleByUser;
function createModule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const { imgUrl, name } = data;
            const module = yield prisma.moduleItem.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    imgUrl,
                    name,
                },
                include: {
                    roles: true,
                }
            });
            res.status(201).json(module);
        }
        catch (error) {
            res.status(500).json("Internal Server Error");
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.createModule = createModule;
function updateModule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { moduleId } = req.params;
            const data = req.body;
            const { name } = data;
            const category = yield prisma.moduleItem.update({
                where: {
                    id: moduleId,
                },
                data: {
                    name,
                },
                include: {
                    roles: true,
                }
            });
            if (category) {
                res.status(200).json(category);
            }
            else {
                res.status(404).json("Module not found");
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
exports.updateModule = updateModule;
function deleteModule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { moduleId } = req.params;
            const module = yield prisma.moduleItem.delete({
                where: {
                    id: moduleId,
                },
            });
            if (module) {
                res.status(200).json("The Module was successfully deleted");
            }
            else {
                res.status(404).json("Module not found");
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
exports.deleteModule = deleteModule;
