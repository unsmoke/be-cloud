import express from 'express';
import cors from 'cors';
import testRouter from '../routes/testRouter.mjs';

export const web = express();
web.use(express.json());
web.use(cors());

web.use('/api/v1', testRouter)
