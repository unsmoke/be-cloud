import userPlanService from '../services/userPlanService.mjs';
import { responseSuccess, responseError } from '../utils/responseAPI.mjs';
import { success } from '../utils/messageSuccess.mjs';
import { errors } from '../utils/messageError.mjs';

const getUserActivePlan = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const userActivePlan = await userPlanService.fetchUserActivePlan(user_id);
    res.status(success.HTTP.CODE.OK).send(
      responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, userActivePlan)
    );
  } catch (error) {
    next(error);
  }
};

const getAllPlan = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const allUserPlan = await userPlanService.fetchAllUserPlan(user_id);
    res.status(success.HTTP.CODE.OK).send(
      responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, allUserPlan)
    );
  } catch (error) {
    next(error);
  }
};

const updateActivePlan = async (req, res, next) => {
  try {
    const data = req.body;
    const user_id = req.user.userId;
    const updatedIsActivePlan = await userPlanService.modifyUserPlanIsActive(data, user_id);
    res.status(success.HTTP.CODE.OK).send(
      responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, updatedIsActivePlan)
    );
  } catch (error) {
    next(error);
  }
};

export default {
  getUserActivePlan,
  getAllPlan,
  updateActivePlan,
};
