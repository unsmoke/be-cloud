import express from 'express';
import testRoutes from './testRouter.mjs';

const router = express.Router();

router.use('/test', testRoutes);

export default router;
