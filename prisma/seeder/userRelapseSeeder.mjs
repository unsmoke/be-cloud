import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const seedUserRelapses = async () => {
    await prisma.userRelapse.createMany({
        data: [
            {
                user_id: 'user-id-1',
                date: 1672531199, // 2023-01-01T00:00:00Z in epoch time
            },
            {
                user_id: 'user-id-2',
                date: 1675209599, // 2023-02-01T00:00:00Z in epoch time
            },
        ],
    })
}

export default seedUserRelapses
