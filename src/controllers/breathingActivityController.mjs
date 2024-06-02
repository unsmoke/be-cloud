import breathingActivityService from "../services/breathingActivityService.mjs";
import {responseSuccess} from "../utils/responseAPI.mjs";
import {success} from "../utils/messageSuccess.mjs";

const getAll = async (req, res, next) => {
    try {
        const result = await breathingActivityService.getAll()
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

const getById = async (req, res, next) => {
    try {
        const result = await breathingActivityService.getById(req.params.id)
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

const create = async (req, res, next) => {
    try {
        const result = await breathingActivityService.create(req.body)
        res.status(success.HTTP.CODE.CREATED).send(
            responseSuccess(
                success.HTTP.CODE.CREATED,
                success.HTTP.STATUS.CREATED,
                result
            )
        )
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await breathingActivityService.update(req.params.id, req.body)
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

const remove = async (req, res, next) => {
    try {
        await breathingActivityService.remove(req.params.id)
        res.status(success.HTTP.CODE.NO_CONTENT).send()
    } catch (e) {
        next(e)
    }
}

export default { getAll, getById, create, update, remove }
