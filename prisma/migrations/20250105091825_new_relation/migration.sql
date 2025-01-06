/*
  Warnings:

  - You are about to drop the column `teacherId` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `librarians` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `teachers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `librarians` will be added. If there are existing duplicate values, this will fail.
  - Made the column `user_id` on table `documents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `librarians` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `class_id` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `teachers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `class_id` on table `teachers` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_user_id_fkey";

-- DropForeignKey
ALTER TABLE "librarians" DROP CONSTRAINT "librarians_user_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_class_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_user_id_fkey";

-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_class_id_fkey";

-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_user_id_fkey";

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "teacherId",
ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "librarians" DROP COLUMN "name",
ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "name",
ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "class_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "name",
ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "class_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "librarians_user_id_key" ON "librarians"("user_id");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "librarians" ADD CONSTRAINT "librarians_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
