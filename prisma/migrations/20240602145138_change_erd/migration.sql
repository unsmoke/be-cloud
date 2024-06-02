-- DropForeignKey
ALTER TABLE "ActivityLog" DROP CONSTRAINT "ActivityLog_activity_id_fkey";

-- DropForeignKey
ALTER TABLE "IsPremium" DROP CONSTRAINT "IsPremium_tier_id_fkey";

-- DropForeignKey
ALTER TABLE "IsPremium" DROP CONSTRAINT "IsPremium_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserHealthData" DROP CONSTRAINT "UserHealthData_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserShopItem" DROP CONSTRAINT "UserShopItem_item_id_fkey";

-- DropForeignKey
ALTER TABLE "UserShopItem" DROP CONSTRAINT "UserShopItem_user_id_fkey";

-- AlterTable
ALTER TABLE "ActivityLog" DROP CONSTRAINT "ActivityLog_pkey",
DROP COLUMN "activity_id",
DROP COLUMN "log_id",
ADD COLUMN "activity_log_id" SERIAL NOT NULL,
ADD COLUMN "breathing_id" INTEGER,
ADD COLUMN "journal_id" INTEGER,
ADD CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("activity_log_id");

-- AlterTable
ALTER TABLE "Item" ADD COLUMN "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN "img_url" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN "cigarettes_avoided" INTEGER DEFAULT 0,
ADD COLUMN "cigarettes_quota" INTEGER[],
ADD COLUMN "city" TEXT DEFAULT '',
ADD COLUMN "is_premium" BOOLEAN DEFAULT false,
ADD COLUMN "money_saved" DOUBLE PRECISION DEFAULT 0.0,
ADD COLUMN "province" TEXT DEFAULT '',
ADD COLUMN "relapse_quota" INTEGER DEFAULT 0,
ADD COLUMN "streak_count" INTEGER DEFAULT 0,
ADD COLUMN "time_zone" TEXT DEFAULT '',
ADD COLUMN "username" TEXT DEFAULT 'unknown',
ALTER COLUMN "full_name" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT,
ALTER COLUMN "exp" DROP DEFAULT,
ALTER COLUMN "balance_coin" DROP DEFAULT,
ALTER COLUMN "balance_coin" SET DATA TYPE INTEGER;

-- Update columns to be non-nullable
ALTER TABLE "User" ALTER COLUMN "cigarettes_avoided" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "city" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "is_premium" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "money_saved" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "province" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "relapse_quota" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "streak_count" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "time_zone" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserItem" DROP COLUMN "quantity";

-- DropTable
DROP TABLE "Activity";

-- DropTable
DROP TABLE "IsPremium";

-- DropTable
DROP TABLE "Tier";

-- DropTable
DROP TABLE "UserHealthData";

-- DropTable
DROP TABLE "UserShopItem";

-- CreateTable
CREATE TABLE "ShopItem" (
    "user_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    CONSTRAINT "ShopItem_pkey" PRIMARY KEY ("user_id", "item_id")
);

-- CreateTable
CREATE TABLE "BreathingActivity" (
    "breathing_id" SERIAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "reward" DOUBLE PRECISION NOT NULL,
    CONSTRAINT "BreathingActivity_pkey" PRIMARY KEY ("breathing_id")
);

-- CreateTable
CREATE TABLE "JournalActivity" (
    "journal_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "reward" DOUBLE PRECISION NOT NULL,
    CONSTRAINT "JournalActivity_pkey" PRIMARY KEY ("journal_id")
);

-- CreateTable
CREATE TABLE "UserHealth" (
    "user_id" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "smoking_start_time" INTEGER NOT NULL,
    "is_nicotine_med" BOOLEAN NOT NULL,
    "is_e_cigarette" BOOLEAN NOT NULL,
    "first_cigarette_date" TIMESTAMP(3) NOT NULL,
    "is_depressed" BOOLEAN NOT NULL,
    "is_other_tobacco" BOOLEAN NOT NULL,
    "is_spirit" BOOLEAN NOT NULL,
    "cigarettes_per_day" INTEGER NOT NULL,
    "cigarettes_per_pack" INTEGER NOT NULL,
    "pack_price" DOUBLE PRECISION NOT NULL,
    CONSTRAINT "UserHealth_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserPlan" (
    "user_id" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "probability" DOUBLE PRECISION NOT NULL,
    "original_cigarettes_quota" INTEGER[],
    "is_active" BOOLEAN NOT NULL,
    CONSTRAINT "UserPlan_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserMilestone" (
    "milestone_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "target_value" INTEGER NOT NULL,
    "achieved_value" INTEGER NOT NULL,
    "date_achieved" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "UserMilestone_pkey" PRIMARY KEY ("milestone_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User" ("username");

-- AddForeignKey
ALTER TABLE "ShopItem" ADD CONSTRAINT "ShopItem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopItem" ADD CONSTRAINT "ShopItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_breathing_id_fkey" FOREIGN KEY ("breathing_id") REFERENCES "BreathingActivity" ("breathing_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_journal_id_fkey" FOREIGN KEY ("journal_id") REFERENCES "JournalActivity" ("journal_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHealth" ADD CONSTRAINT "UserHealth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlan" ADD CONSTRAINT "UserPlan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMilestone" ADD CONSTRAINT "UserMilestone_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
