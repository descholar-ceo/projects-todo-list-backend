import express from 'express';
import controllers from '../../controllers';

const { TodoController } = controllers;
const todoController = new TodoController();
const router = express.Router();

router.post('/todos', todoController.saveTodo);
router.get('/todos', todoController.getTodos);
router.patch('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

export default router;
