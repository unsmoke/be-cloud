import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const seedUsers = async () => {
    await prisma.user.createMany({
        data: [
            {
                user_id: 'user-id-1',
                full_name: 'John Doe',
                username: 'johndoe',
                email: 'john.doe@example.com',
                password: 'password123',
                time_zone: 'GMT',
                balance_coin: 100,
                exp: 50,
                streak_count: 5,
                money_saved: 20.0,
                cigarettes_avoided: 10,
                cigarettes_quota: [1, 2, 3],
                relapse_quota: 1,
                province: 'Province1',
                city: 'City1',
                is_premium: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
            {
                user_id: 'user-id-2',
                full_name: 'Jane Smith',
                username: 'janesmith',
                email: 'jane.smith@example.com',
                password: 'password123',
                time_zone: 'GMT',
                balance_coin: 200,
                exp: 100,
                streak_count: 10,
                money_saved: 40.0,
                cigarettes_avoided: 20,
                cigarettes_quota: [2, 4, 6],
                relapse_quota: 2,
                province: 'Province2',
                city: 'City2',
                is_premium: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
        ],
    })
}

export default seedUsers
