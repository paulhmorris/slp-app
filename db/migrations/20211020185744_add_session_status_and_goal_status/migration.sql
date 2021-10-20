/*
  Warnings:

  - You are about to drop the column `status` on the `PatientSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "goalStatusId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "PatientSession" DROP COLUMN "status",
ADD COLUMN     "sessionStatusId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "SessionStatus" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SessionStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoalStatus" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GoalStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PatientSession" ADD CONSTRAINT "PatientSession_sessionStatusId_fkey" FOREIGN KEY ("sessionStatusId") REFERENCES "SessionStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_goalStatusId_fkey" FOREIGN KEY ("goalStatusId") REFERENCES "GoalStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
