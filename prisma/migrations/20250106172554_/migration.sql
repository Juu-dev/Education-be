/*
  Warnings:

  - You are about to drop the column `dob` on the `librarians` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `teachers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "librarians" DROP COLUMN "dob";

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "dob";
