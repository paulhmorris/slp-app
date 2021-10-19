/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `SessionType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Patient_email_key";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "body" SET DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "SessionType_name_key" ON "SessionType"("name");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
