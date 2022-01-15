import express from 'express';
import controllers from '../../controllers';

const { ProjectController } = controllers;
const projectController = new ProjectController();
const router = express.Router();

router.post('/projects', projectController.saveProject);
router.get('/projects', projectController.getProjects);
router.patch('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

export default router;
