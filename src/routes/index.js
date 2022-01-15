import express from 'express';
import apiRouter from './api/index';

const allRoutes = express.Router();

allRoutes.use('/api/v1', apiRouter);

export default allRoutes;
