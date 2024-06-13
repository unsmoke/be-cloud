import relapseService from '../services/relapseService.mjs'

const postRelapse = async (req, res, next) => {
    try {
        const result = await relapseService.handleRelapse(req)
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

export default {
    postRelapse,
}
