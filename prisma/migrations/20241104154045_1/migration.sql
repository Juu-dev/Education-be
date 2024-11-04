-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "user_student_fk";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "user_teacher_fk";

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
