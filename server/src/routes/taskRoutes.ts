import express from "express";
import { addTask, getTasks } from "../controllers/taskController";

const router = express.Router();

router.get("/tasks", getTasks);
router.post("/tasks", addTask);


export { router };
