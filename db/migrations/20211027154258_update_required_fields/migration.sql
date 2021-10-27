/*
  Warnings:

  - Made the column `goalCategoryId` on table `Goal` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_goalCategoryId_fkey";

-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "goalCategoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_goalCategoryId_fkey" FOREIGN KEY ("goalCategoryId") REFERENCES "GoalCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
