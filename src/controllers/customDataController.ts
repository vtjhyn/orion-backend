import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getItemCustom = async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany({
      select: {
        id: true,
        name: true,
        stock: true,
        price: true,
        stock_alert: true,
        available: true,
        expired_date: true,
        category: {
          select: {
            name: true,
          },
        },
        default_uom: {
          select: {
            name: true,
          },
        },
        supplier: {
          select: {
            name: true,
          },
        },
        list_uom: {
          select: {
            uom: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const cleanData = items.map((item) => {
      const default_uom = item.default_uom?.name;
      const category = item.category.name;
      const list_uom = item.list_uom.map((uom) => uom.uom.name);
      return { ...item, default_uom, category, list_uom };
    });

    return res.status(200).json(cleanData);
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
}