import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const addItemUom = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { itemId, uomIds } = req.body;

    const createdItemUoms = await prisma.itemUom.createMany({
      data: uomIds.map((uomId: string) => ({
        item_id: itemId,
        uom_id: uomId,
      })),
    });

    res.status(201).json(createdItemUoms);
  } catch (error) {
    console.error("Error adding uoms to item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getItemUomsByItemId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const itemId = req.query.itemId as string;
    const itemUoms = await prisma.itemUom.findMany({
      where: { item_id: itemId },
      include: { uom: true },
    });

    res.status(200).json(itemUoms);
  } catch (error) {
    console.error("Error fetching item uoms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteItemUom = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { itemId, uomId } = req.body;

    await prisma.itemUom.delete({
      where: {
        item_id_uom_id: {
          item_id: itemId,
          uom_id: uomId,
        },
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting item uom:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
