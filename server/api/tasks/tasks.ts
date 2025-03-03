import { VercelRequest, VercelResponse } from "@vercel/node";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const tasks = await prisma.task.findMany();
      res.status(200).json({ data: tasks });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
