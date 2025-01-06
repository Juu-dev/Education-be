/*
  Warnings:

  - You are about to drop the column `class_id` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `class_id` on the `teachers` table. All the data in the column will be lost.
  - You are about to alter the column `class_id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(36)`.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_class_id_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "class_id";

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "class_id";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "class_id" SET DATA TYPE VARCHAR(36);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
