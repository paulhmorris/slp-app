-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_patientSessionId_fkey";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "goalId" INTEGER,
ALTER COLUMN "patientSessionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_patientSessionId_fkey" FOREIGN KEY ("patientSessionId") REFERENCES "PatientSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
