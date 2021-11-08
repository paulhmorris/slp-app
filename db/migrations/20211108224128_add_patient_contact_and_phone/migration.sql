/*
  Warnings:

  - A unique constraint covering the columns `[patientId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('PARENT', 'GUARDIAN', 'FAMILY_MEMBER', 'OTHER');

-- CreateEnum
CREATE TYPE "PhoneType" AS ENUM ('MOBILE', 'HOME', 'WORK');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_patientId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "country" SET DEFAULT E'USA',
ALTER COLUMN "patientId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "PatientContact" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "responsibileForBilling" BOOLEAN NOT NULL DEFAULT false,
    "organizationId" INTEGER NOT NULL,
    "contactType" "ContactType" NOT NULL DEFAULT E'PARENT',

    CONSTRAINT "PatientContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "number" TEXT NOT NULL,
    "patientId" INTEGER,
    "patientContactId" INTEGER,
    "userId" INTEGER,
    "phoneType" "PhoneType" NOT NULL DEFAULT E'MOBILE',

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Phone_patientContactId_key" ON "Phone"("patientContactId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_patientId_key" ON "Address"("patientId");

-- AddForeignKey
ALTER TABLE "PatientContact" ADD CONSTRAINT "PatientContact_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_patientContactId_fkey" FOREIGN KEY ("patientContactId") REFERENCES "PatientContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
