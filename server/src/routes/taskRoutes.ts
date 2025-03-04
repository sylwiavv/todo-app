import express from 'express';
import {
  addTask,
  deleteTask,
  getTasks,
  toggleTaskCompletion,
  updateTask,
} from '../controllers/taskController';

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', addTask);

router.delete('/tasks/:id', deleteTask);
router.patch('/tasks/:id', updateTask);
router.patch('/tasks/:id/completion', toggleTaskCompletion);

export { router };
