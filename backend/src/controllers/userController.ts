import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import exclude from "../utils/exclude";

const prisma = new PrismaClient();
const saltRounds = 10; // Jumlah putaran untuk pembuatan salt

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
      },
    });
    const cleanData = exclude(users, ["hashedPassword"]);
    return res.status(200).json(cleanData);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        role: true,
      },
    });

    if (user) {
      const cleanData = exclude(user, ["hashedPassword"]);
      res.status(200).json(cleanData);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function createUser(req: Request, res: Response) {
  const data = req.body;
  const { name, email, password, roleId } = data;
  try {
    const existEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existEmail !== null) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        id: uuid(),
        name,
        email,
        hashedPassword,
        salt,
        role: {
          connect: {
            id: roleId,
          },
        },
      },
      include: {
        role: true,
      },
    });

    const cleanData = exclude(user, ["hashedPassword"]);

    res.status(201).json(cleanData);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUser(req: Request, res: Response) {
  const { userId } = req.params;
  const data = req.body;
  const { name, email, roleId } = data;
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        role: {
          connect: {
            id: roleId,
          },
        },
      },
      include: {
        role: true,
      },
    });

    if (user) {
      const cleanData = exclude(user, ["hashedPassword"]);
      res.status(200).json(cleanData);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    if (user) {
      res.status(200).json("The user was successfully deleted");
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
