import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const seedUserPlans = async () => {
    await prisma.userPlan.createMany({
        data: [
            {
                user_id: 'user-id-1',
                duration: 30,
                probability: 0.8,
                original_cigarettes_quota: [1, 2, 3],
                is_active: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
            {
                user_id: 'user-id-2',
                duration: 60,
                probability: 0.9,
                original_cigarettes_quota: [2, 4, 6],
                is_active: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
        ],
    })
}

export default seedUserPlans
