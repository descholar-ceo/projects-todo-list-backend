import express from 'express';
import { WELCOME_MESSAGE } from '../../utils/custom-messages.util';
import { OK } from '../../utils/status-codes.util';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(OK).json({ message: WELCOME_MESSAGE });
  });

export default router;
