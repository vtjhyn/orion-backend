import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getItems = async (req: Request, res: Response) => {
  try {
    const { limit = 10, page = 1, categoryId, fields } = req.query;

    const selectFields = fields
      ? fields
          .toString()
          .split(",")
          .reduce((acc, curr) => ({ ...acc, [curr]: true }), {})
      : undefined;

    const items = await prisma.item.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      where: {
        category_id: categoryId as string | undefined,
      },
      select: selectFields,
    });

    return res.json(items);
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const item = await prisma.item.findUnique({ where: { id: id } });
    if (!item) return res.status(404).json({ msg: "Item not found" });
    return res.status(200).json(item);
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, categoryId, stock, price, stock_alert, available } = req.body;
    const item = await prisma.item.create({
      data: {
        name,
        category: {
          connect: {
            id: categoryId,
          },
        },
        stock,
        price,
        stock_alert,
        available,
      },
      include: {
        category: true,
        default_uom: true,
        supplier: true,
      },
    });
    return res.status(201).json(item);
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const {
      name,
      categoryId,
      stock,
      price,
      stock_alert,
      available,
      default_uom_id,
    } = req.body;
    const existingItem = await prisma.item.findUnique({ where: { id: id } });
    if (!existingItem) return res.status(404).json({ msg: "Item not found" });
    const item = await prisma.item.update({
      where: { id: id },
      data: {
        name,
        category: {
          connect: {
            id: categoryId,
          },
        },
        stock,
        price,
        stock_alert,
        available,
        default_uom: {
          connect: {
            id: default_uom_id,
          },
        },
      },
      include: {
        category: true,
        default_uom: true,
        supplier: true,
      },
    });
    if (!item) return res.status(404).json({ msg: "Item not found" });
    return res.status(200).json(item);
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const item = await prisma.item.delete({
      where: { id: id },
    });
    if (!item) return res.status(404).json({ msg: "Item not found" });
    return res.status(200).json({ msg: "Item deleted" });
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};
