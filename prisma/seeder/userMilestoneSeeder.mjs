import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const seedUserMilestones = async () => {
    await prisma.userMilestone.createMany({
        data: [
            {
                user_id: 'user-id-1',
                title: 'First Milestone',
                description: 'Completed the first milestone',
                target_value: 100,
                achieved_value: 100,
                date_achieved: 1672531199, // 2023-01-01T00:00:00Z in epoch time
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
            {
                user_id: 'user-id-2',
                title: 'Second Milestone',
                description: 'Completed the second milestone',
                target_value: 200,
                achieved_value: 200,
                date_achieved: 1675209599, // 2023-02-01T00:00:00Z in epoch time
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
        ],
    })
}

export default seedUserMilestones
