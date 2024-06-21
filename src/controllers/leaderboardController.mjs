import leaderboardService from '../services/leaderboardService.mjs'
import { responseSuccess, responseError } from '../utils/responseAPI.mjs'
import { success } from '../utils/messageSuccess.mjs'
import { errors } from '../utils/messageError.mjs'

const getProvinceLeaderboard = async (req, res, next) => {
    try {
        const user_id = req.user.userId
        const { province_id } = req.params
        const { sort_by, page = 1, per_page = 10 } = req.query

        const provinceLeaderboards = await leaderboardService.fetchLeaderboardProvince(
            province_id,
            sort_by,
            page,
            per_page
        )
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, provinceLeaderboards)
        )
    } catch (error) {
        next(error)
    }
}

const getCityLeaderboard = async (req, res, next) => {
    try {
        const user_id = req.user.userId
        const { city_id } = req.params
        const { sort_by, page = 1, per_page = 10 } = req.query

        const cityLeaderboards = await leaderboardService.fetchLeaderboardCity(
            city_id,
            sort_by,
            page,
            per_page
        )
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, cityLeaderboards)
        )
    } catch (error) {
        next(error)
    }
}

export default {
    getProvinceLeaderboard,
    getCityLeaderboard,
}
