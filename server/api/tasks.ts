import { PrismaClient } from '@prisma/client';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const getTasks = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const tasks = await prisma.task.findMany();
    return res.status(200).json({ status: 200, data: tasks });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addNewTask = async (req: VercelRequest, res: VercelResponse) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        id: uuidv4(),
        title,
        description: description,
        completed: false,
        createdAt: new Date(),
      },
    });

    return res.status(201).json({ status: 201, data: newTask });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTask = async (req: VercelRequest, res: VercelResponse) => {
  const { id } = req.query;
  const { title, description, completed } = req.body;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        completed,
      },
    });

    return res.status(200).json({ status: 200, data: updatedTask });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const markTaskAsCompleted = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Task ID is required' });
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { completed: true },
    });

    return res.status(200).json({ status: 200, data: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTask = async (req: VercelRequest, res: VercelResponse) => {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    await prisma.task.delete({ where: { id } });
    return res.status(200).json({ status: 200, message: 'Task deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  switch (req.method) {
    case 'GET':
      return getTasks(req, res);

    case 'POST':
      return addNewTask(req, res);

    case 'PUT':
      if (req.query.complete) {
        return markTaskAsCompleted(req, res);
      }
      return updateTask(req, res);
    case 'DELETE':
      return deleteTask(req, res);

    default:
      return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
