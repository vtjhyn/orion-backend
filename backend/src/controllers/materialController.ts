import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

export async function getMaterials(req: Request, res: Response) {
  try {
    const materials = await prisma.material.findMany({
      include: {
        unit: true,
        products: true,
      },
    });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json('Internal Server Error');
  } finally {
    await prisma.$disconnect();
  }
}

export async function getMaterialById(req: Request, res: Response) {
  try {
    const { materialId } = req.params;

    const material = await prisma.material.findUnique({
      where: {
        id: materialId,
      },
      include: {
        unit: true,
        products: true,
      },
    });

    if (material) {
      res.status(200).json(material);
    } else {
      return res.status(404).json('Material not found');
    }
  } catch (error) {
    res.status(500).json('Internal Server Error');
  } finally {
    await prisma.$disconnect();
  }
}

export async function createMaterial(req: Request, res: Response) {
  try {
    const data = req.body;
    const { imgUrl, name, quantity, unitId } = data;

    const material = await prisma.material.create({
      data: {
        id: uuid(),
        imgUrl,
        name,
        quantity,
        unit: {
          connect: {
            id: unitId,
          },
        },
      },
      include: {
        unit: true,
        products: true,
      },
    });

    res.status(201).json(material);
  } catch (error) {
    res.status(500).json('Internal Server Error');
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateMaterial(req: Request, res: Response) {
  try {
    const { materialId } = req.params;
    const data = req.body;
    const { imgUrl, name, quantity, unitId } = data;

    const material = await prisma.material.update({
      where: {
        id: materialId,
      },
      data: {
        imgUrl,
        name,
        quantity,
        unit: {
          connect: {
            id: unitId,
          },
        },
      },
      include: {
        unit: true,
        products: true,
      },
    });

    if (material) {
      res.status(200).json(material);
    } else {
      res.status(404).json('Material not found');
    }
  } catch (error) {
    res.status(500).json('Internal Server Error');
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteMaterial(req: Request, res: Response) {
  try {
    const { materialId } = req.params;

    const material = await prisma.material.delete({
      where: {
        id: materialId,
      },
    });

    if (material) {
      res.status(200).json('The material was successfully deleted');
    } else {
      return res.status(404).json('Material not found');
    }
  } catch (error) {
    res.status(500).json('Internal Server Error');
  } finally {
    await prisma.$disconnect();
  }
}
