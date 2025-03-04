import { PrismaClient } from '@prisma/client';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// --------------------------------------------------------------------
const getTasks = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const tasks = await prisma.task.findMany();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// --------------------------------------------------------------------
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

    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// --------------------------------------------------------------------
const deleteTask = async (req: VercelRequest, res: VercelResponse) => {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    await prisma.task.delete({ where: { id } });
    return res
      .status(200)
      .json({ status: 200, message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// --------------------------------------------------------------------
const updateTask = async (req: VercelRequest, res: VercelResponse) => {
  const { id } = req.query;
  const { title, description } = req.body;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
      },
    });

    return res.status(200).json(updateTask);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// --------------------------------------------------------------------
const toggleTaskCompletion = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const { id } = req.query;
  const { completed } = req.body;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { completed },
    });

    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// --------------------------------------------------------------------
const handler = async (req: VercelRequest, res: VercelResponse) => {
  switch (req.method) {
    case 'GET':
      return getTasks(req, res);

    case 'POST':
      return addNewTask(req, res);

    case 'DELETE':
      return deleteTask(req, res);

    case 'PATCH':
      if (req.query.id && req.body.title) {
        return updateTask(req, res);
      } else if (req.query.id) {
        return toggleTaskCompletion(req, res);
      }
      return res.status(400).json({ error: 'Invalid request format' });

    default:
      return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
