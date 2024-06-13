import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const seedUserItems = async () => {
    await prisma.userItem.createMany({
        data: [
            {
                user_id: 'user-id-1',
                item_id: 'item-id-1',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
            {
                user_id: 'user-id-2',
                item_id: 'item-id-2',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
        ],
    })
}

export default seedUserItems
