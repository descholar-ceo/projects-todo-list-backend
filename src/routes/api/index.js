import express from 'express';
import docRouter from './docs.routes';
import welcomeRoute from './welcome.routes';
import projectRouter from './project.routes';

const apiRouter = express.Router();
apiRouter.use(docRouter);
apiRouter.use(welcomeRoute);
apiRouter.use(projectRouter);

export default apiRouter;
