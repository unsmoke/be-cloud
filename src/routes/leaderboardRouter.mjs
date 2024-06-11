import express from 'express';
import leaderboardController from '../controllers/leaderboardController.mjs';
import authMiddleware from '../middlewares/authMiddleware.mjs';
import { validateLeaderboardProvinceParams, validateLeaderboardCityParams } from '../validations/leaderboardValidations.mjs';

const leaderboardRouter = express.Router();

leaderboardRouter.get(
  '/leaderboard/province/:province_id',
  authMiddleware,
  validateLeaderboardProvinceParams,
  leaderboardController.getProvinceLeaderboard
);

leaderboardRouter.get(
  '/leaderboard/city/:city_id',
  authMiddleware,
  validateLeaderboardCityParams,
  leaderboardController.getCityLeaderboard
);

export default leaderboardRouter;
