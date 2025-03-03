import express from "express";
import { getTasks } from "../controllers/taskController";

const router = express.Router();

router.get("/tasks", getTasks);

export { router };
