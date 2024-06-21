/*
  Warnings:

  - Changed the type of `is_e_cigarette` on the `UserHealth` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `is_other_tobacco` on the `UserHealth` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserHealth"
ALTER COLUMN "is_e_cigarette" TYPE INTEGER USING "is_e_cigarette"::INTEGER,
ALTER COLUMN "is_other_tobacco" TYPE INTEGER USING "is_other_tobacco"::INTEGER;
