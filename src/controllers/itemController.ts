import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getItems = async (req: Request, res: Response) => {
  try {
    const { limit = 10, page = 1, categoryId, fields } = req.query;

    let selectFields: Record<string, boolean> | undefined;

    if (fields) {
      const fieldList = fields.toString().split(",");
      selectFields = {};
      fieldList.forEach((field) => {
        const cleanField = field.replace(/[\[\]"]+/g, '');
        selectFields![cleanField] = true;
      });
    }

    const items = await prisma.item.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      where: {
        category_id: categoryId as string | undefined,
      },
      select: {
        ...selectFields,
        id: true,
        name: true,
        stock: true,
        price: true,
        stock_alert: true,
        available: true,
        category: { select: { name: true } },
        default_uom: { select: { name: true } },
        supplier: { select: { name: true } },
        list_uom: { select: { uom_id: true, uom: { select: { id: true, name: true } }, createdAt: true, updatedAt: true } },
      } || {
        id: true,
        name: true,
        stock: true,
        price: true,
        stock_alert: true,
        available: true,
        category: { select: { name: true } },
        default_uom: { select: { name: true } },
        supplier: { select: { name: true } },
        list_uom: { select: { uom_id: true, uom: { select: { id: true, name: true } }, createdAt: true, updatedAt: true } },
      },
    });

    // Transform the data before sending the response
    const transformedItems = items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        stock: item.stock,
        price: item.price,
        stock_alert: item.stock_alert,
        available: item.available,
        supplier: item.supplier?.name || null,
        category: item.category?.name || null,
        default_uom: item.default_uom?.name || null,
        list_uom: item.list_uom?.map((itemUom) => ({
          id: itemUom.uom?.id,
          name: itemUom.uom?.name,
        })) || [],
      };
    });

    return res.json(transformedItems);
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};


export const getItemById = async (req: Request, res: Response) => {
  try {
    const itemId = req.query.itemId as string;
    const item = await prisma.item.findUnique({
      where: { id: itemId },
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
        category: {
          select: {
            name: true,
          },
        },
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
    if (!existingItem) return res.status(404).json({ msg: "Item not found" });
    const item = await prisma.item.update({
      where: { id: itemId },
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
    const itemId = req.query.itemId as string;
    const item = await prisma.item.delete({
      where: { id: itemId },
    });
    if (!item) return res.status(404).json({ msg: "Item not found" });
    return res.status(200).json({ msg: "Item deleted" });
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};
