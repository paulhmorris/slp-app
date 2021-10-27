/*
  Warnings:

  - You are about to drop the column `goalId` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `isLongTerm` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Goal` table. All the data in the column will be lost.
  - Added the required column `goalCategoryId` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_goalId_fkey";

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "goalId",
DROP COLUMN "isLongTerm",
DROP COLUMN "name",
ADD COLUMN     "goalCategoryId" INTEGER NOT NULL,
ADD COLUMN     "parentGoalId" INTEGER,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GoalCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoalCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_parentGoalId_fkey" FOREIGN KEY ("parentGoalId") REFERENCES "Goal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_goalCategoryId_fkey" FOREIGN KEY ("goalCategoryId") REFERENCES "GoalCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
