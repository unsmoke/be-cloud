/*
  Warnings:

  - You are about to drop the column `relapse_quota` on the `User` table. All the data in the column will be lost.
  - Added the required column `lung_url` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "lung_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "relapse_quota";

-- CreateTable
CREATE TABLE "UserRelapse" (
    "relapse_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRelapse_pkey" PRIMARY KEY ("relapse_id")
);

-- AddForeignKey
ALTER TABLE "UserRelapse" ADD CONSTRAINT "UserRelapse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
