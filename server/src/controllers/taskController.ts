import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

// ----------------------------------
exports.getTasks = async (req: Request, res: Response) => {
  try {
    const managers = await prisma.task.findMany();
    return res.status(200).json({ data: managers });
  } catch (error) {
    return res
      .status(500)
      .json({ error: { status: 500, message: "Internal Server Error" } });
  }
};

