import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCategories(req: Request, res: Response) {
  try {
    const category = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        item: {
          select: {
            name: true,

          },
        },
      },
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function getCategoryById(req: Request, res: Response) {
  try {
    const categoryId = req.query.categoryId as string;

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
     include: {
        item: true,
      },
    });
    if (category) {
      res.status(200).json(category);
    } else {
      return res.status(404).json("Category not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    const data = req.body;
    const { name } = data;

    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const categoryId = req.query.categoryId as string;
    const data = req.body;
    const { name } = data;

    const category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(400).json("Category not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const categoryId = req.query.categoryId as string;

    const category = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    if (category) {
      res.status(200).json("The category was successfully deleted");
    } else {
      return res.status(404).json("Category not found");
    }
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
