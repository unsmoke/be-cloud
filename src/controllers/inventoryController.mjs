import inventoryService from "../services/inventoryService.mjs";
import {responseSuccess} from "../utils/responseAPI.mjs";
import {success} from "../utils/messageSuccess.mjs";

const getUserInventory = async (req, res, next) => {
    try {
        const result = await inventoryService.getInventory(req.user.userId)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(
                success.HTTP.CODE.OK,
                success.HTTP.STATUS.OK,
                result
            )
        )
    } catch (e) {
        next(e)
    }
}

export default { getUserInventory }