import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { prisma } from './lib/prisma';

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

export default app;