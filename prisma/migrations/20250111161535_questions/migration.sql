/*
  Warnings:

  - You are about to drop the column `question_type` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "question_type";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "description";
