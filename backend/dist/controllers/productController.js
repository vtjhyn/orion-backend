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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield prisma.product.findMany({
                include: {
                    unit: true,
                    category: true,
                    materials: true,
                    variants: true,
                },
            });
            return res.status(200).json(products);
        }
        catch (error) {
            return res.status(500).json("Internal Server Error");
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getProducts = getProducts;
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            const product = yield prisma.product.findUnique({
                where: {
                    id: productId,
                },
                include: {
                    unit: true,
                    category: true,
                    materials: true,
                    variants: true,
                },
            });
            if (product) {
                res.status(200).json(product);
            }
            else {
                res.status(404).json("Product not found");
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
exports.getProductById = getProductById;
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const { imgUrl, sku, name, description, cost, quantity, unitId, categoryId, materials, variants, } = data;
            // Create product
            const product = yield prisma.product.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    imgUrl,
                    sku,
                    name,
                    description,
                    cost,
                    quantity,
                    unit: {
                        connect: {
                            id: unitId,
                        },
                    },
                    category: {
                        connect: {
                            id: categoryId,
                        },
                    },
                    materials: {
                        create: materials.map((material) => ({
                            quantityUse: material.quantityUse,
                            material: {
                                connect: {
                                    id: material.materialId,
                                },
                            },
                        })),
                    },
                    variants: {
                        create: variants,
                    },
                },
                include: {
                    unit: true,
                    category: true,
                    materials: {
                        include: {
                            material: true,
                        },
                    },
                    variants: true,
                },
            });
            res.status(201).json(product);
        }
        catch (error) {
            console.error(error);
            res.status(500).json("Internal Server Error");
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.createProduct = createProduct;
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            const data = req.body;
            const { imgUrl, name, description, unitId, categoryId, materials, variants, } = data;
            const updatedProduct = yield prisma.product.update({
                where: {
                    id: productId,
                },
                data: {
                    imgUrl,
                    name,
                    description,
                    unit: {
                        connect: {
                            id: unitId,
                        },
                    },
                    category: {
                        connect: {
                            id: categoryId,
                        },
                    },
                    materials: {
                        upsert: materials.map((material) => ({
                            where: {
                                productId_materialId: {
                                    productId,
                                    materialId: material.materialId,
                                },
                            },
                            create: {
                                productId,
                                materialId: material.materialId,
                                quantityUse: material.quantityUse,
                            },
                            update: {
                                quantityUse: material.quantityUse,
                            },
                        })),
                    },
                    variants: {
                        upsert: variants.map((variant) => ({
                            where: { id: variant.id },
                            create: variant,
                            update: variant, // Update the variant if it exists
                        })),
                    },
                },
                include: {
                    unit: true,
                    category: true,
                    materials: true,
                    variants: true,
                },
            });
            if (updatedProduct) {
                res.status(200).json(updatedProduct);
            }
            else {
                res.status(404).json("Product not found");
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json("Internal Server Error");
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.updateProduct = updateProduct;
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            const product = yield prisma.product.findUnique({
                where: {
                    id: productId,
                },
                include: {
                    materials: true,
                },
            });
            if (product) {
                yield prisma.product.delete({
                    where: {
                        id: productId,
                    },
                });
                yield Promise.all(product.materials.map((material) => prisma.productMaterial.delete({
                    where: {
                        productId_materialId: {
                            productId,
                            materialId: material.materialId,
                        },
                    },
                })));
                res.status(200).json("The product was successfully deleted");
            }
            else {
                res.status(404).json("Product not found");
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
exports.deleteProduct = deleteProduct;
