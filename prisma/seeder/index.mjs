import seedUsers from './userSeeder.mjs'
import seedItems from './itemSeeder.mjs'
import seedUserItems from './userItemSeeder.mjs'
import seedShopItems from './shopItemSeeder.mjs'
// import seedBreathingActivities from './breathingActivitySeeder.mjs'
import seedJournalActivities from './journalActivitySeeder.mjs'
import seedUserHealths from './userHealthSeeder.mjs'
import seedUserPlans from './userPlanSeeder.mjs'
import seedUserMilestones from './userMilestoneSeeder.mjs'
import seedUserRelapses from './userRelapseSeeder.mjs'
import { logger } from '../../src/app/logging.mjs'

const seed = async () => {
    await seedUsers()
    await seedItems()
    await seedUserItems()
    await seedShopItems()
    // await seedBreathingActivities()
    await seedJournalActivities()
    await seedUserHealths()
    await seedUserPlans()
    await seedUserMilestones()
    await seedUserRelapses()
}

seed().catch((e) => {
    logger.error(e)
    process.exit(1)
})

// Run the seeder
// $ node -r esm prisma/seeder/index.mjs
//
// If you see the following output, the seeder has run successfully:
// Prisma Client is ready
// Prisma Client is ready
