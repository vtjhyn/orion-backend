import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

export async function getModules(req: Request, res: Response) {
  try {
    const modules = await prisma.moduleItem.findMany({
      include: {
        roles: true,
      }
    });
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function getModuleByUser(req: Request, res: Response) {
  try {
    const { roleId } = req.params;
    const modules = await prisma.moduleList.findMany({
      where: {
        roleId,
      },
      include: {
        modules: true,
      }
    });
    if (modules) {
      res.status(200).json(modules);
    } else {
      return res.status(404).json("Modules not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function createModule(req: Request, res: Response) {
  try {
    const data = req.body;
    const { imgUrl, name } = data;

    const module = await prisma.moduleItem.create({
      data: {
        id: uuid(),
        imgUrl,
        name,
      },
      include: {
        roles: true,
      }
    });
    res.status(201).json(module);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateModule(req: Request, res: Response) {
  try {
    const { moduleId } = req.params;
    const data = req.body;
    const { name } = data;

    const category = await prisma.moduleItem.update({
      where: {
        id: moduleId,
      },
      data: {
        name,
      },
      include: {
        roles: true,
      }
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json("Module not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteModule(req: Request, res: Response) {
  try {
    const { moduleId } = req.params;

    const module = await prisma.moduleItem.delete({
      where: {
        id: moduleId,
      },
    });
    if (module) {
      res.status(200).json("The Module was successfully deleted");
    } else {
      res.status(404).json("Module not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
