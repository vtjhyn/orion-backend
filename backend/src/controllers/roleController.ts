import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

export async function getRoles(req: Request, res: Response) {
  try {
    const roles = await prisma.role.findMany();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json('Internal Server Error');
  } finally {
    await prisma.$disconnect();
  }
}

export async function getRoleById(req: Request, res: Response) {
  try {
    const { roleId } = req.params;

    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (role) {
      res.status(200).json(role);
    } else {
      return res.status(404).json('Role not found');
    }
  } catch (error) {
    res.status(500).json('Internal Server Error');
  } finally {
    await prisma.$disconnect();
  }
}

export async function createRole(req: Request, res: Response) {
  try {
    const data = req.body;
    const { imgUrl, name } = data;

    const role = await prisma.role.create({
      data: {
        id: uuid(),
        imgUrl,
        name,
      },
    });

    res.status(201).json(role);
  } catch (error) {
    res.status(500).json('Internal Server Error');
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateRole(req: Request, res: Response) {
  try {
    const { roleId } = req.params;
    const data = req.body;
    const { imgUrl, name } = data;

    const role = await prisma.role.update({
      where: {
        id: roleId,
      },
      data: {
        imgUrl,
        name,
      },
    });

    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json('Role not found');
    }
  } catch (error) {
    res.status(500).json('Internal Server Error');
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteRole(req: Request, res: Response) {
  try {
    const { roleId } = req.params;

    const role = await prisma.role.delete({
      where: {
        id: roleId,
      },
    });

    if (role) {
      res.status(200).json('The role was successfully deleted');
    } else {
      return res.status(404).json('Role not found');
    }
  } catch (error) {
    res.status(500).json('Internal Server Error');
  } finally {
    await prisma.$disconnect();
  }
}
