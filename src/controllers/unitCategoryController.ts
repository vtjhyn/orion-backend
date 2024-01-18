import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUnitCategories(req: Request, res: Response) {
  try {
    const unitCategories = await prisma.uoMCategory.findMany({
    });
    res.status(200).json(unitCategories);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUnitCategoryById(req: Request, res: Response) {
  try {
    const unitCategoryId = req.query.unitCategoryId as string;

    const unitCategory = await prisma.uoMCategory.findUnique({
      where: {
        id: unitCategoryId,
      },
    });
    if (unitCategory) {
      res.status(200).json(unitCategory);
    } else {
      return res.status(404).json("UnitCategory not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function createUnitCategory(req: Request, res: Response) {
  try {
    const data = req.body;
    const { name } = data;

    const unitCategory = await prisma.uoMCategory.create({
      data: {
        name,
      },
    });
    res.status(201).json(unitCategory);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUnitCategory(req: Request, res: Response) {
  try {
    const unitCategoryId = req.query.unitCategoryId as string;
    const data = req.body;
    const { name } = data;

    const unitCategory = await prisma.uoMCategory.update({
      where: {
        id: unitCategoryId,
      },
      data: {
        name,
      },
    });
    if (unitCategory) {
      res.status(200).json(unitCategory);
    } else {
      res.status(400).json("Unit not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteUnitCategory(req: Request, res: Response) {
  try {
    const unitCategoryId = req.query.unitCategoryId as string;

    const unitCategory = await prisma.uoMCategory.delete({
      where: {
        id: unitCategoryId,
      },
    });
    if (unitCategory) {
      res.status(200).json("The UnitCategory was successfully deleted");
    } else {
      return res.status(404).json("UnitCategory not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
