/*
  Warnings:

  - The primary key for the `UserPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `last_7_days` to the `UserHealth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motivation` to the `UserHealth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserHealth" ADD COLUMN     "last_7_days" BOOLEAN NOT NULL,
ADD COLUMN     "motivation" VARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE "UserPlan" DROP CONSTRAINT "UserPlan_pkey",
ADD COLUMN     "plan_id" SERIAL NOT NULL,
ADD CONSTRAINT "UserPlan_pkey" PRIMARY KEY ("plan_id");
