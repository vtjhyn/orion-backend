import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

export async function getUnits(req: Request, res: Response) {
  try {
    const units = await prisma.uom.findMany();
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUnitById(req: Request, res: Response) {
  try {
    const { unitId } = req.params;

    const unit = await prisma.uom.findUnique({
      where: {
        id: unitId,
      },
    });
    if (unit) {
      res.status(200).json(unit);
    } else {
      return res.status(404).json("Unit not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function createUnit(req: Request, res: Response) {
  try {
    const data = req.body;
    const { name } = data;

    const unit = await prisma.uom.create({
      data: {
        id: uuid(),
        name,
      },
    });
    res.status(201).json(unit);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUnit(req: Request, res: Response) {
  try {
    const { unitId } = req.params;
    const data = req.body;
    const { name } = data;

    const unit = await prisma.uom.update({
      where: {
        id: unitId,
      },
      data: {
        name,
      },
    });
    if (unit) {
      res.status(200).json(unit);
    } else {
      res.status(400).json("Unit not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteUnit(req: Request, res: Response) {
  try {
    const { unitId } = req.params;

    const unit = await prisma.uom.delete({
      where: {
        id: unitId,
      },
    });
    if (unit) {
      res.status(200).json("The unit was successfully deleted");
    } else {
      return res.status(404).json("Unit not found");
    }
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
