import itemService from '../services/itemService.mjs'
import { responseSuccess } from '../utils/responseAPI.mjs'
import { success } from '../utils/messageSuccess.mjs'

const getAllItems = async (req, res, next) => {
    try {
        const result = await itemService.fetchAllItems()
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const getItemDetail = async (req, res, next) => {
    try {
        const itemId = req.params.item_id
        const result = await itemService.fetchItemDetail(itemId)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const createNewItem = async (req, res, next) => {
  try {
      const itemData = req.body;
      const result = await itemService.createItem(itemData);
      res.status(success.HTTP.CODE.CREATED).send(
          responseSuccess(success.HTTP.CODE.CREATED, success.HTTP.STATUS.CREATED, result)
      );
  } catch (e) {
      next(e);
  }
};

const updateItem = async (req, res, next) => {
  try {
      const itemId = req.params.item_id;
      const itemData = req.body;
      const result = await itemService.modifyItem(itemId, itemData);
      res.status(success.HTTP.CODE.OK).send(
          responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
      );
  } catch (e) {
      next(e);
  }
};

const deleteItem = async (req, res, next) => {
  try {
      const itemId = req.params.item_id;
      await itemService.removeItem(itemId);
      res.status(success.HTTP.CODE.NO_CONTENT).send();
  } catch (e) {
      next(e);
  }
};

export default { getAllItems, getItemDetail, createNewItem, updateItem, deleteItem };
