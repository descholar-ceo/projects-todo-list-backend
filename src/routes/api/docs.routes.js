import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerSpecs from '../../../public/api-docs/swagger.json';

const router = express.Router();

router.use('/docs', serve, setup(swaggerSpecs));

export default router;
