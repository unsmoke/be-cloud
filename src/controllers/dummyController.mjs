import dummyService from '../services/dummyService.mjs'
import {success} from "../utils/messageSuccess.mjs";
import {responseSuccess} from "../utils/responseAPI.mjs";

const test = async (req, res, next) => {
    try {
        const result = await dummyService.test();
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e);
    }
}

export default {
    test
}
