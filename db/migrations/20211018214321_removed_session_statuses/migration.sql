/*
  Warnings:

  - You are about to drop the `SessionStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SessionStatus" DROP CONSTRAINT "SessionStatus_patientSessionId_fkey";

-- AlterTable
ALTER TABLE "PatientSession" ALTER COLUMN "status" SET DEFAULT E'new',
ALTER COLUMN "status" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "SessionStatus";
