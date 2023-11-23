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
exports.deleteRole = exports.updateRole = exports.createRole = exports.getRoleById = exports.getRoles = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
function getRoles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const roles = yield prisma.role.findMany();
            res.status(200).json(roles);
        }
        catch (error) {
            res.status(500).json('Internal Server Error');
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getRoles = getRoles;
function getRoleById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { roleId } = req.params;
            const role = yield prisma.role.findUnique({
                where: {
                    id: roleId,
                },
            });
            if (role) {
                res.status(200).json(role);
            }
            else {
                return res.status(404).json('Role not found');
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
exports.getRoleById = getRoleById;
function createRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const { imgUrl, name } = data;
            const role = yield prisma.role.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    imgUrl,
                    name,
                },
            });
            res.status(201).json(role);
        }
        catch (error) {
            res.status(500).json('Internal Server Error');
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.createRole = createRole;
function updateRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { roleId } = req.params;
            const data = req.body;
            const { imgUrl, name } = data;
            const role = yield prisma.role.update({
                where: {
                    id: roleId,
                },
                data: {
                    imgUrl,
                    name,
                },
            });
            if (role) {
                res.status(200).json(role);
            }
            else {
                res.status(404).json('Role not found');
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
exports.updateRole = updateRole;
function deleteRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { roleId } = req.params;
            const role = yield prisma.role.delete({
                where: {
                    id: roleId,
                },
            });
            if (role) {
                res.status(200).json('The role was successfully deleted');
            }
            else {
                return res.status(404).json('Role not found');
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
exports.deleteRole = deleteRole;
