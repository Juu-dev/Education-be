/*
  Warnings:

  - You are about to drop the column `start_time` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `task_description` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `title` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_assignee_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_assigner_id_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "start_time",
DROP COLUMN "task_description",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" VARCHAR(36) NOT NULL,
ADD COLUMN     "type" VARCHAR(255),
ALTER COLUMN "assigned_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assigner_id_fkey" FOREIGN KEY ("assigner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
