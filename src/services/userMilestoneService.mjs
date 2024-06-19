import { PrismaClient } from '@prisma/client'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'
import { fetchIdMilestoneSchema } from '../validations/userMilestoneValidations.mjs'
import { validate } from '../validations/validation.mjs'

const prisma = new PrismaClient()

const fetchMilestoneDetail = async (req) => {
    const { userId } = validate(fetchIdMilestoneSchema, req.params)

    const user = await prisma.user.findUnique({
        where: { user_id: userId },
    })

    if (!user) {
        throw new ResponseError(
            errors.HTTP.CODE.NOT_FOUND,
            errors.HTTP.STATUS.NOT_FOUND,
            errors.USER.NOT_FOUND
        )
    }

    return checkMilestones(user)
}

const checkMilestones = (user) => {
    const milestones = [
        {
            title: 'Eternal Smoke-Free Warrior 🚭✨',
            description: 'Tidak merokok 21/30 hari atau 42/60 hari.',
            condition: (user) => user.streak_count >= 21 || user.streak_count >= 42,
            badgeUrl: 'https://storage.googleapis.com/unsmoke-assets/badges/badges%201.svg',
        },
        {
            title: 'Gold Saver Champion 💰🏆',
            description: 'Menghemat Rp 300.000 sebulan atau Rp 600.000 dua bulan.',
            condition: (user) => user.money_saved >= 300000 || user.money_saved >= 600000,
            badgeUrl: 'https://storage.googleapis.com/unsmoke-assets/badges/badges%202.svg',
        },
        {
            title: 'Habit Crusher Master 💥🔨',
            description: 'Tidak merokok 80% dari hari dalam satu atau dua bulan.',
            condition: (user) => {
                const totalDays = user.current_day
                const nonSmokingDays = user.streak_count
                return nonSmokingDays / totalDays >= 0.8
            },
            badgeUrl: 'https://storage.googleapis.com/unsmoke-assets/badges/badges%203.svg',
        },
        {
            title: 'Lung Legend 🌬🏅',
            description: 'Meningkatkan kapasitas paru-paru signifikan dalam satu atau dua bulan.',
            condition: (user) => {
                const initialLungCapacity = 100 // Example initial capacity, replace with actual value
                return (
                    parseFloat(user.current_lung) > initialLungCapacity * 1.15 ||
                    parseFloat(user.current_lung) > initialLungCapacity * 1.25
                )
            },
            badgeUrl: 'https://storage.googleapis.com/unsmoke-assets/badges/badges%204.svg',
        },
        {
            title: 'Smoke-Free Milestone Conqueror 🎉🚫',
            description: 'Menghindari 300 rokok sebulan atau 600 rokok dua bulan.',
            condition: (user) => user.cigarettes_avoided >= 300 || user.cigarettes_avoided >= 600,
            badgeUrl: 'https://storage.googleapis.com/unsmoke-assets/badges/badges%205.svg',
        },
        {
            title: 'Daily Consistency Guru ⏰🔒',
            description: 'Menyelesaikan tugas harian 90% dari hari dalam satu atau dua bulan.',
            condition: (user) => user.streak_count >= 0.9 * user.current_day,
            badgeUrl: 'https://storage.googleapis.com/unsmoke-assets/badges/badges%206.svg',
        },
        {
            title: 'Health Evolutionist 🌱🔄',
            description: 'Meningkatkan performa paru-paru 15% sebulan atau 25% dua bulan.',
            condition: (user) => {
                const initialLungPerformance = 100 // Example initial performance, replace with actual value
                return (
                    parseFloat(user.current_lung) > initialLungPerformance * 1.15 ||
                    parseFloat(user.current_lung) > initialLungPerformance * 1.25
                )
            },
            badgeUrl: 'https://storage.googleapis.com/unsmoke-assets/badges/badges%207.svg',
        },
        {
            title: 'Exemplary Quitter Elite 🌟🚭',
            description: 'Menyelesaikan semua tugas berhenti merokok dalam satu atau dua bulan.',
            condition: (user) => user.streak_count >= 30 || user.streak_count >= 60,
            badgeUrl: 'https://storage.googleapis.com/unsmoke-assets/badges/badges%208.svg',
        },
    ]

    return milestones.filter((milestone) => milestone.condition(user))
}

export default {
    fetchMilestoneDetail,
}
