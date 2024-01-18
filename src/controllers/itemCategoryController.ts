import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getItemCategories(req: Request, res: Response) {
  try {
    const itemCategory = await prisma.itemCategory.findMany();
    res.status(200).json(itemCategory);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function getItemCategoryById(req: Request, res: Response) {
  try {
    const itemCategoryId = req.query.itemCategoryId as string;

    const itemCategory = await prisma.itemCategory.findUnique({
      where: {
        id: itemCategoryId,
      },
    });
    if (itemCategory) {
      res.status(200).json(itemCategory);
    } else {
      return res.status(404).json("ItemCategory not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function createItemCategory(req: Request, res: Response) {
  try {
    const data = req.body;
    const { name } = data;

    const itemCategory = await prisma.itemCategory.create({
      data: {
        name,
      },
    });
    res.status(201).json(itemCategory);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateItemCategory(req: Request, res: Response) {
  try {
    const itemCategoryId = req.query.itemCategoryId as string;
    const data = req.body;
    const { name } = data;

    const itemCategory = await prisma.itemCategory.update({
      where: {
        id: itemCategoryId,
      },
      data: {
        name,
      },
    });
    if (itemCategory) {
      res.status(200).json(itemCategory);
    } else {
      res.status(400).json("Category not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteItemCategory(req: Request, res: Response) {
  try {
    const itemCategoryId = req.query.itemCategoryId as string;

    const itemCategory = await prisma.itemCategory.delete({
      where: {
        id: itemCategoryId,
      },
    });
    if (itemCategory) {
      res.status(200).json("The itemCategory was successfully deleted");
    } else {
      return res.status(404).json("Category not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
