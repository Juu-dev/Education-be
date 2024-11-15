import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const seedRoles = async () => {
  const roles = [
    { name: 'admin' },
    { name: 'teacher' },
    { name: 'librarian' },
    { name: 'student' },
  ];

  await Promise.all(
    roles.map(async (role) => {
      await prisma.role.upsert({
        where: { name: role.name },
        update: {},
        create: role,
      });
    })
  );
};

const seedStudents = async () => {
  const accountsPath = path.join(__dirname, 'accounts.json');
  const accountsData = fs.readFileSync(accountsPath, 'utf-8');
  const accounts = JSON.parse(accountsData).filter(
    (account) => account.role.toLowerCase() === 'student'
  );

  const users = await Promise.all(
    accounts.map(async (account) => {
      const hashedPassword = await bcrypt.hash(account.password, 10);

      // Create User
      const user = await prisma.user.create({
        data: {
          username: account.username,
          password: hashedPassword,
          email: account.username, // Assuming email is same as username
        },
      });

      // Assign Role
      const studentRole = await prisma.role.findUnique({
        where: { name: 'student' },
      });
      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: studentRole.id,
        },
      });

      // Create Student Record
      // You may need to map class names to class IDs if using class names
      const classRecord = await prisma.class.findUnique({
        where: { name: account.class },
      });

      await prisma.student.create({
        data: {
          userId: user.id,
          classId: classRecord ? classRecord.id : null,
          name: account.fullName,
          // Include other fields as needed
        },
      });

      return user;
    })
  );

  return users;
};

const seedAdmin = async () => {
  const adminUsers = await seedUsers('admin');
  await assignRoles(adminUsers, 'admin');
};

const seedLibrarian = async () => {
  const librarianUsers = await seedUsers('librarian');
  await assignRoles(librarianUsers, 'librarian');
};

const seedClasses = async () => {
  const classes = [
    { name: 'Class 1' },
    { name: 'Class 2' },
    // Add other classes as needed
  ];

  const createdClasses = await Promise.all(
    classes.map(async (classData) => {
      return prisma.class.create({
        data: classData,
      });
    })
  );

  return createdClasses;
};

const seedTeachers = async (userIds, classIds) => {
  const teachers = userIds.map((userId, index) => ({
    userId,
    classId: classIds[index % classIds.length],
    name: `Teacher ${index + 1}`,
    position: 'Subject Teacher',
  }));

  await Promise.all(
    teachers.map(async (teacher) => {
      await prisma.teacher.create({ data: teacher });
    })
  );
};

const seedDocuments = async () => {
  const teachers = await prisma.teacher.findMany();

  const documentPromises = [];

  teachers.forEach((teacher) => {
    for (let i = 1; i <= 10; i++) {
      documentPromises.push(
        prisma.document.create({
          data: {
            teacherId: teacher.id,
            type: 'Assignment',
            description: `Homework assignment ${i} for ${teacher.name}`,
            createdAt: new Date(),
            url: `http://example.com/homework${i}.pdf`,
          },
        })
      );
    }
  });

  await Promise.all(documentPromises);
};

const main = async () => {
  await seedRoles();

  await seedAdmin();
  await seedLibrarian();
  await seedTeachers();
  await seedStudents();

  console.log('Seeding completed!');
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
