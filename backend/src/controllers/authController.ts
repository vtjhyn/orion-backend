import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();
const saltRounds = 10; // Jumlah putaran untuk pembuatan salt

export async function Register(req: Request, res: Response) {
  try {
    const data = req.body;
    const { name, email, password, roleId } = data;

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

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(`Internal Server Error: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
}

export const Login = async (req: Request, res: Response) => {
  const data = req.body;
  const { email, password } = data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        role: true,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isCorrectPassword) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json("Internal Server Error: Secret key not defined");
    }

    const token = jwt.sign(
      { userId: user.id, userEmail: user.email, userRole: user.role.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};
