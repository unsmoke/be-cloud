import locationService from '../services/locationService.mjs'
import { responseSuccess, responseError } from '../utils/responseAPI.mjs'
import { success } from '../utils/messageSuccess.mjs'
import { errors } from '../utils/messageError.mjs'

const getAllProvince = async (req, res, next) => {
    try {
        const provinceLeaderboards = await locationService.fetchAllProvince()
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, provinceLeaderboards)
        )
    } catch (error) {
        next(error)
    }
}

const getCityByProvince = async (req, res, next) => {
    try {
        const { province_id } = req.params

        const cityLeaderboards = await locationService.fetchCityByProvinceId(province_id)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, cityLeaderboards)
        )
    } catch (error) {
        next(error)
    }
}

export default {
    getAllProvince,
    getCityByProvince,
}
