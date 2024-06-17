import userMilestoneService from '../services/userMilestoneService.mjs'

const getMilestoneDetail = async (req, res, next) => {
    try {
        const { id } = req.params
        const userMilestone = await userMilestoneService.fetchMilestoneDetail(id)
        res.status(200).json(userMilestone)
    } catch (error) {
        next(error)
    }
}

const createNewMilestone = async (req, res, next) => {
    try {
        const userMilestone = await userMilestoneService.createMilestone(req)
        res.status(201).json(userMilestone)
    } catch (error) {
        next(error)
    }
}

export default {
    getMilestoneDetail,
    createNewMilestone,
}
