/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `goalId` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "goalId" INTEGER NOT NULL,
ADD COLUMN     "isLongTerm" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'USER';

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
