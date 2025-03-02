import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  const newTask = await prisma.task.create({ data: { title, description } });
  res.status(201).json(newTask);
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const updatedTask = await prisma.task.update({
    where: { id },
    data: { title, description, completed },
  });
  res.json(updatedTask);
});

// Usunięcie zadania
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id } });
  res.json({ message: "Task deleted" });
});

// if (process.env.NODE_ENV !== "production") {
//   const PORT = 3001;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }

export default app;
