import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import allRoutes from './routes/index';
import statusCodes from './utils/statusCodes';
import { endpointNotFound } from './utils/customMessages';

dotenv.config();

const app = express();
const port = process.env.PORT;
const { notFound } = statusCodes;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(allRoutes);

app.use((req, res, next) => {
  res.status(notFound).json({
    message: endpointNotFound,
  });
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default app;
