import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'

dotenv.config()

const validSortFields = [
    'user_id',
    'full_name',
    'username',
    'email',
    'password',
    'time_zone',
    'balance_coin',
    'exp',
    'streak_count',
    'money_saved',
    'cigarettes_avoided',
    'cigarettes_quota',
    'relapse_quota',
    'province',
    'city',
    'is_premium',
    'created_at',
    'updated_at',
]

const fetchLeaderboardProvince = async (province_id, sort_by = 'exp', page = 1, per_page = 10) => {
    if (!validSortFields.includes(sort_by)) {
        sort_by = 'exp'
    }

    const allUsers = await prismaClient.user.findMany({
        where: { province: province_id },
        orderBy: { [sort_by]: 'desc' },
    })

    const usersWithRank = allUsers.map((user, index) => ({
        ...user,
        rank: index + 1,
    }))

    const offset = (page - 1) * per_page
    const paginatedUsers = usersWithRank.slice(offset, offset + per_page)

    return paginatedUsers.map((user) => ({
        username: user.username,
        exp: user.exp,
        rank: user.rank,
    }))
}

const fetchLeaderboardCity = async (city_id, sort_by = 'exp', page = 1, per_page = 10) => {
    if (!validSortFields.includes(sort_by)) {
        sort_by = 'exp'
    }

    const allUsers = await prismaClient.user.findMany({
        where: { city: city_id },
        orderBy: { [sort_by]: 'desc' },
    })

    const usersWithRank = allUsers.map((user, index) => ({
        ...user,
        rank: index + 1,
    }))

    const offset = (page - 1) * per_page
    const paginatedUsers = usersWithRank.slice(offset, offset + per_page)

    return paginatedUsers.map((user) => ({
        username: user.username,
        exp: user.exp,
        rank: user.rank,
    }))
}

export default {
    fetchLeaderboardProvince,
    fetchLeaderboardCity,
}
