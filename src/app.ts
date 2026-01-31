import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { limiter } from './middleware/rateLimiter.js';

const app = express();


app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json());

export default app;