-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "description" DROP DEFAULT,
ALTER COLUMN "img_url" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cigarettes_avoided" DROP DEFAULT,
ALTER COLUMN "city" DROP DEFAULT,
ALTER COLUMN "is_premium" DROP DEFAULT,
ALTER COLUMN "money_saved" DROP DEFAULT,
ALTER COLUMN "province" DROP DEFAULT,
ALTER COLUMN "relapse_quota" DROP DEFAULT,
ALTER COLUMN "streak_count" DROP DEFAULT,
ALTER COLUMN "time_zone" DROP DEFAULT,
ALTER COLUMN "username" DROP DEFAULT;
