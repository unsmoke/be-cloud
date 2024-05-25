-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "balance_coin" REAL NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "IsPremium" (
    "user_id" TEXT NOT NULL,
    "tier_id" TEXT,

    CONSTRAINT "IsPremium_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Tier" (
    "tier_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Tier_pkey" PRIMARY KEY ("tier_id")
);

-- CreateTable
CREATE TABLE "UserHealthData" (
    "user_id" TEXT NOT NULL,
    "cigarettes_per_day" DOUBLE PRECISION NOT NULL,
    "minutes" DOUBLE PRECISION NOT NULL,
    "uses_substitutes" DOUBLE PRECISION NOT NULL,
    "electronic_cigarette" DOUBLE PRECISION NOT NULL,
    "gender" INTEGER NOT NULL,
    "age" DOUBLE PRECISION NOT NULL,
    "smoking_interval_years" DOUBLE PRECISION NOT NULL,
    "depressed" DOUBLE PRECISION NOT NULL,
    "smokes_other" DOUBLE PRECISION NOT NULL,
    "no_pleasure" DOUBLE PRECISION NOT NULL,
    "label" INTEGER NOT NULL,

    CONSTRAINT "UserHealthData_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserItem" (
    "user_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "UserItem_pkey" PRIMARY KEY ("user_id","item_id")
);

-- CreateTable
CREATE TABLE "Item" (
    "item_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "UserShopItem" (
    "user_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "UserShopItem_pkey" PRIMARY KEY ("user_id","item_id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "activity_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("activity_id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "log_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("log_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tier_name_key" ON "Tier"("name");

-- AddForeignKey
ALTER TABLE "IsPremium" ADD CONSTRAINT "IsPremium_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IsPremium" ADD CONSTRAINT "IsPremium_tier_id_fkey" FOREIGN KEY ("tier_id") REFERENCES "Tier"("tier_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHealthData" ADD CONSTRAINT "UserHealthData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItem" ADD CONSTRAINT "UserItem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItem" ADD CONSTRAINT "UserItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserShopItem" ADD CONSTRAINT "UserShopItem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserShopItem" ADD CONSTRAINT "UserShopItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activity"("activity_id") ON DELETE RESTRICT ON UPDATE CASCADE;
