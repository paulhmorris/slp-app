/*
  Warnings:

  - Added the required column `scoreTypeId` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "scoreTypeId" INTEGER,
ALTER COLUMN "sessionTypeId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "scoreTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ScoreType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScoreType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_scoreTypeId_fkey" FOREIGN KEY ("scoreTypeId") REFERENCES "ScoreType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_scoreTypeId_fkey" FOREIGN KEY ("scoreTypeId") REFERENCES "ScoreType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
