/*
  Warnings:

  - You are about to drop the column `student_id` on the `borrowed_logs` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `document_students` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `exercise_students` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `marks` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `ratings` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `requests` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `document_students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `exercise_students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `marks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `ratings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "borrowed_logs" DROP CONSTRAINT "borrowed_logs_student_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_student_id_fkey";

-- DropForeignKey
ALTER TABLE "document_students" DROP CONSTRAINT "document_students_student_id_fkey";

-- DropForeignKey
ALTER TABLE "exercise_students" DROP CONSTRAINT "exercise_students_student_id_fkey";

-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_student_id_fkey";

-- DropForeignKey
ALTER TABLE "marks" DROP CONSTRAINT "marks_student_id_fkey";

-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_student_id_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_student_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_class_id_fkey";

-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_class_id_fkey";

-- AlterTable
ALTER TABLE "borrowed_logs" DROP COLUMN "student_id",
ADD COLUMN     "user_id" VARCHAR(36);

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "student_id",
ADD COLUMN     "user_id" VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE "document_students" DROP COLUMN "student_id",
ADD COLUMN     "user_id" VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE "exercise_students" DROP COLUMN "student_id",
ADD COLUMN     "user_id" VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "teacherId",
ADD COLUMN     "userId" VARCHAR(36);

-- AlterTable
ALTER TABLE "goals" DROP COLUMN "student_id",
ADD COLUMN     "user_id" VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE "marks" DROP COLUMN "student_id",
ADD COLUMN     "user_id" VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE "ratings" DROP COLUMN "student_id",
ADD COLUMN     "user_id" VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE "requests" DROP COLUMN "student_id",
ADD COLUMN     "user_id" VARCHAR(36);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "class_id" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_students" ADD CONSTRAINT "document_students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marks" ADD CONSTRAINT "marks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrowed_logs" ADD CONSTRAINT "borrowed_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_students" ADD CONSTRAINT "exercise_students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
