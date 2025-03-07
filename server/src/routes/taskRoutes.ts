import express from 'express';
import {
  addTask,
  deleteTask,
  getTasks,
  toggleTaskComplete,
  updateTask,
} from '../controllers/taskController';

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', addTask);

router.delete('/tasks/:id', deleteTask);
router.patch('/tasks/:id', updateTask);
router.patch('/tasks/:id/completed', toggleTaskComplete);

export { router };
