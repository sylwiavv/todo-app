import { PrismaClient } from "@prisma/client";
import { VercelRequest, VercelResponse } from "@vercel/node";

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      const tasks = await prisma.task.findMany();
      return res.status(200).json({ data: tasks });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
