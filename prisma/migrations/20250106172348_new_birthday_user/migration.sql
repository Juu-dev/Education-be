/*
  Warnings:

  - You are about to drop the column `birth_date` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "birth_date";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birth_date" TIMESTAMP(6);
