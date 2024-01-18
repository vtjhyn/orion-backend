import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany({
      include: {
        category: true,
        default_uom: true,
        stock_opname: true,
        list_uom: true,
        item_logs: true,
        transactions: true,
      },
    });

    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const itemId = req.query.itemId as string;
    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });
    if (!item) return res.status(404).json("Item not found");
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
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
    });
    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.query.itemId as string;
    const {
      name,
      categoryId,
      stock,
      price,
      stock_alert,
      available,
      default_uom_id,
    } = req.body;
    const existingItem = await prisma.item.findUnique({
      where: { id: itemId },
    });
    if (!existingItem) return res.status(404).json("Item not found");
    const item = await prisma.item.update({
      where: { id: itemId },
      data: {
        name: name || existingItem.name,
        category: {
          connect: {
            id: categoryId || existingItem.category_id,
          },
        },
        stock: stock || existingItem.stock,
        price: price || existingItem.price,
        stock_alert: stock_alert || existingItem.stock_alert,
        available: available || existingItem.available,
        default_uom: {
          connect: {
            id: default_uom_id || existingItem.default_uom_id,
          },
        },
      },
    });
    if (!item) return res.status(404).json("Item not found");
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.query.itemId as string;
    const item = await prisma.item.delete({
      where: { id: itemId },
    });
    if (!item) return res.status(404).json("Item not found");
    return res.status(200).json("Item deleted");
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};
