import { Router } from "express";
import prisma from "./db";

const router = Router();

// ----------------------------------------//

router.get("/", async (req, res) => {
  const tasks = await prisma.task.findMany();
  console.log(tasks, "TASKS")
  res.json(tasks);

});