/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `GoalCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `GoalStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ScoreType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `SessionStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GoalCategory_name_key" ON "GoalCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GoalStatus_name_key" ON "GoalStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ScoreType_name_key" ON "ScoreType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SessionStatus_name_key" ON "SessionStatus"("name");
