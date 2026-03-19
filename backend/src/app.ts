import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser";

import router from './routes/index';

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', router);

export default app;