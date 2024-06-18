import relapseService from "../services/relapseService.mjs";
import { responseSuccess } from "../utils/responseAPI.mjs";
import { success } from "../utils/messageSuccess.mjs";

const postRelapse = async (req, res, next) => {
  try {
    const result = await relapseService.handleRelapse(req);
    res.status(success.HTTP.CODE.OK).send(
      responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
    );
  } catch (error) {
    next(error);
  }
};

export default {
  postRelapse
};
