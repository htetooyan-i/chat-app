import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser";

import router from './routes/index';

const app = express();

const allowedOrigins = [
    "https://www.konyat.chat",
    "http://localhost:3000",  // Next.js dev
];

app.use(cors({
    origin: (origin, callback) => {
        // allow requests with no origin (mobile apps, curl, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS blocked: ${origin}`));
        }
    },
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', router);

export default app;