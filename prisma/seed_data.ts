import {seedRoles} from "./data-seed-function/seed-roles";
import {PrismaClient} from "@prisma/client";
import {seedClasses} from "./data-seed-function/seed-classes";
import {seedUsers} from "./data-seed-function/seed-users";
import {seedBooks} from "./data-seed-function/seed-books";
import {seedQuizzes} from "./data-seed-function/seed-quizzes";
import {seedExercises} from "./data-seed-function/seed-exercises";
import {seedTasks} from "./data-seed-function/seed-tasks";
import {seedDocuments} from "./data-seed-function/seed-documents";

const prisma = new PrismaClient();

const main = async () => {
    // Seed roles
    await seedRoles(prisma);
    console.log('Seeding roles completed!');

    // Seed classes
    const createdClass = await seedClasses(prisma);
    console.log('Seeding classes completed!');

    // Seed users
    await seedUsers(prisma, createdClass)
    console.log('Seeding users completed!');

    // Seed books
    await seedBooks(prisma)
    console.log('Seeding books completed!');

    // Seed Quizzes
    const quizIds = await seedQuizzes(prisma)
    console.log('Seeding quizzes completed!');

    await seedExercises(prisma, quizIds)
    console.log('Seeding exercises completed!');

    await seedTasks(prisma)
    console.log('Seeding tasks completed!');

    await seedDocuments(prisma)
    console.log('Seeding documents completed!');

    // Done
    console.log('Seeding All completed!');
};

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
