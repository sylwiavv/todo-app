import { PrismaClient } from '@prisma/client';
import { VercelRequest, VercelResponse } from "@vercel/node";

const prisma = new PrismaClient();

const getAllTasks = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'GET') {
    try {
      const tasks = await prisma.task.findMany();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Error' });
    }
  } else {
    res.status(405).json({ error: 'Error' });
  }
}

export default getAllTasks