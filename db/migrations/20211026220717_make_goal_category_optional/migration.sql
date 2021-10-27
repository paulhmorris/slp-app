-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_goalCategoryId_fkey";

-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "goalCategoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_goalCategoryId_fkey" FOREIGN KEY ("goalCategoryId") REFERENCES "GoalCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
