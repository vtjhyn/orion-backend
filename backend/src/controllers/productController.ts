import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany({
      include: {
        unit: true,
        category: true,
        materials: true,
        variants: true,
      },
    });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const product = await prisma.product.findUnique({
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
    } else {
      res.status(404).json("Product not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const data = req.body;
    const {
      imgUrl,
      sku,
      name,
      description,
      cost,
      quantity,
      unitId,
      categoryId,
      materials,
      variants,
    } = data;

    // Create product
    const product = await prisma.product.create({
      data: {
        id: uuid(),
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
          create: materials.map((material: any) => ({
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
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const data = req.body;
    const {
      imgUrl,
      name,
      description,
      unitId,
      categoryId,
      materials,
      variants,
    } = data;

    const updatedProduct = await prisma.product.update({
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
          upsert: materials.map((material: any) => ({
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
          upsert: variants.map((variant: any) => ({
            where: { id: variant.id }, // Use the variant ID for updating existing variants
            create: variant, // Create the variant if it doesn't exist
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
    } else {
      res.status(404).json("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        materials: true,
      },
    });
    if (product) {
      await prisma.product.delete({
        where: {
          id: productId,
        },
      });
      await Promise.all(
        product.materials.map((material) =>
          prisma.productMaterial.delete({
            where: {
              productId_materialId: {
                productId,
                materialId: material.materialId,
              },
            },
          })
        )
      );
      res.status(200).json("The product was successfully deleted");
    } else {
      res.status(404).json("Product not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
