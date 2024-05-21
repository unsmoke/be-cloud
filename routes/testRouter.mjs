import express from 'express';
import { getTest } from '../controllers/testController.mjs'; // Assuming getTest is exported

const router = express.Router();

router.get("", getTest);

export default router;
