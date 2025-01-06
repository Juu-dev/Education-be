/*
  Warnings:

  - You are about to drop the column `teacher_id` on the `documents` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_teacher_id_fkey";

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "teacher_id",
ADD COLUMN     "teacherId" TEXT,
ADD COLUMN     "user_id" VARCHAR(36);

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
