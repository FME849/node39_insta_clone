import express from 'express';
import cors from 'cors';
import rootRouter from './routes/rootRoute.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('./'))
app.use(rootRouter);

app.listen(8080);