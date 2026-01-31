import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { limiter } from './middleware/rateLimiter.js';

//
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/users.routes.js';

const app = express();


app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

export default app;