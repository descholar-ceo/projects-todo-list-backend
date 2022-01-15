import express from 'express';
import docRouter from './docs/docs.routes';
import welcomeRoute from './welcomeRoute/welcome.routes';

const apiRouter = express.Router();
apiRouter.use(docRouter);
apiRouter.use(welcomeRoute);

export default apiRouter;
