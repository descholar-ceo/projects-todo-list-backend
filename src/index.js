import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import allRoutes from './routes/index';
import { NOT_FOUND } from './utils/status-codes.util';
import { RESOURCE_NOT_FOUND } from './utils/custom-messages.util';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(allRoutes);

app.use((req, res, next) => {
  res.status(NOT_FOUND).json({
    message: RESOURCE_NOT_FOUND,
  });
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default app;
