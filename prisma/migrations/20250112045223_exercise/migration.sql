/*
  Warnings:

  - You are about to drop the column `class_id` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `metadata_url` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the `exercise_students` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assigner_id` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_assignee_id` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quiz_id` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_out` to the `exercises` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exercise_students" DROP CONSTRAINT "exercise_students_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "exercise_students" DROP CONSTRAINT "exercise_students_user_id_fkey";

-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_class_id_fkey";

-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_userId_fkey";

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "creatorId" VARCHAR(36);

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "class_id",
DROP COLUMN "level",
DROP COLUMN "metadata_url",
DROP COLUMN "userId",
ADD COLUMN     "assigner_id" VARCHAR(36) NOT NULL,
ADD COLUMN     "class_assignee_id" VARCHAR(36) NOT NULL,
ADD COLUMN     "description" VARCHAR(255) NOT NULL,
ADD COLUMN     "quiz_id" VARCHAR(36) NOT NULL,
ADD COLUMN     "time_out" INTEGER NOT NULL;

-- DropTable
DROP TABLE "exercise_students";

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_assigner_id_fkey" FOREIGN KEY ("assigner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_class_assignee_id_fkey" FOREIGN KEY ("class_assignee_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
