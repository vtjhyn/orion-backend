import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const addUnit = async (req: Request, res: Response) => {
  try {
    const { itemId, uomIds } = req.body;

    const units = await prisma.uoM.createMany({
      data: uomIds.map((uomId: string) => ({
        item_id: itemId,
        uom_id: uomId,
      })),
    });

    res.status(201).json(units);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const getUnitById = async (req: Request, res: Response) => {
  try {
    const itemId = req.query.itemId as string;
    const unit = await prisma.uoM.findMany({
      where: { item_id: itemId },
      include: { uom: true },
    });
    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const deleteUnit = async (req: Request, res: Response) => {
  try {
    const { itemId, uomId } = req.body;

    const unit = await prisma.uoM.delete({
      where: {
        item_id_uom_id: {
          item_id: itemId,
          uom_id: uomId,
        },
      },
    });

    if (unit) {
      res.status(200).json("Unit deleted");
    } else {
      res.status(404).json("Unit not found" );
    }
  } catch (error) {
    res.status(500).json("Internal Server Error" );
  }
};
