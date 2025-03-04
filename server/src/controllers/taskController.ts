import { Request, Response } from 'express';
import { prisma } from '../database';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

export const addTask = async (req: Request, res: Response): Promise<any> => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        completed: false,
        createdAt: new Date(),
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};
