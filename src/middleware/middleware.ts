import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }
  if (!process.env.JWT_SECRET) {
    return res
      .status(500)
      .json("Internal Server Error: Secret key not defined");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    (req as any).userId = (decoded as any).userId;
    next();
  });
  if (!process.env.JWT_SECRET) {
    return res
      .status(500)
      .json("Internal Server Error: Secret key not defined");
  }
};
