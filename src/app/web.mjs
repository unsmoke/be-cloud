import express from 'express';
import cors from 'cors';
import dummyRouter from '../routes/dummyRouter.mjs';

export const web = express();
web.use(express.json());
web.use(cors());

web.use('/api/v1', dummyRouter)
