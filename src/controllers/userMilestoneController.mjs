import userMilestoneService from '../services/userMilestoneService.mjs'

const getAllMilestones = async (req, res, next) => {
    try {
        const userMilestones = await userMilestoneService.fetchAllMilestones()
        res.status(200).json(userMilestones)
    } catch (error) {
        next(error)
    }
}

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

const updateMilestone = async (req, res, next) => {
    try {
        const { id } = req.params
        const userMilestone = await userMilestoneService.modifyMilestone(id, req)
        res.status(200).json(userMilestone)
    } catch (error) {
        next(error)
    }
}

const deleteMilestone = async (req, res, next) => {
    try {
        const { id } = req.params
        await userMilestoneService.removeMilestone(id)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

export default {
    getAllMilestones,
    getMilestoneDetail,
    createNewMilestone,
    updateMilestone,
    deleteMilestone,
}
