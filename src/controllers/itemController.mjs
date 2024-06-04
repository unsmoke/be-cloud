import itemService from "../services/itemService.mjs";
import { responseSuccess } from "../utils/responseAPI.mjs";
import { success } from "../utils/messageSuccess.mjs";

const getAllItem = async (req, res, next) => {
  try {
    const result = await itemService.getAllItem()
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

const getItem = async (req, res, next) => {
  try {
    const itemId = req.params.item_id
    const result = await itemService.getItemDetail(itemId)
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

export default { getItem, getAllItem }