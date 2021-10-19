-- CreateTable
CREATE TABLE "SessionStatus" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "patientSessionId" INTEGER NOT NULL,

    CONSTRAINT "SessionStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SessionStatus" ADD CONSTRAINT "SessionStatus_patientSessionId_fkey" FOREIGN KEY ("patientSessionId") REFERENCES "PatientSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
