import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const seedJournalActivities = async () => {
    await prisma.journalActivity.createMany({
        data: [
            {
                title: 'Journal Entry 1',
                body: 'Body of journal entry 1',
                reward: 5.0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
            {
                title: 'Journal Entry 2',
                body: 'Body of journal entry 2',
                reward: 10.0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
        ],
    })
}

export default seedJournalActivities
