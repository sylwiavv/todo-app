import { Router } from "express";
import prisma from "./db";

const router = Router();

// ----------------------------------------//

router.get("/", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

router.post("/", async (req, res) => {
  const { title } = req.body;
  try {
    const task = await prisma.task.create({ data: { title } });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "The task was not created." });
  }
});

// ----------------------------------------//

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, completed },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(404).json({ error: "The task is not found." });
  }
});

// ----------------------------------------//

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id } });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(404).json({ error: "The task is not found." });
  }
});

export default router;
