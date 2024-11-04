import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedRoles = async () => {
  const roles = [
    { name: 'Student' },
    { name: 'Teacher' },
    { name: 'Librarian' },
  ];

  await Promise.all(
      roles.map(async (role) => {
        await prisma.role.create({ data: role });
      })
  );
};

// $2a$10$9CtWDff4uH5jUQcLqpgobObQqrp5EYVdhnr.5EMa4/oKwPrepihPS = 123456
const seedUsers = async () => {
  const users = [];

  // Tạo 18 sinh viên
  for (let i = 1; i <= 18; i++) {
    users.push({
      username: `student${i}`,
      password: '$2a$10$9CtWDff4uH5jUQcLqpgobObQqrp5EYVdhnr.5EMa4/oKwPrepihPS',
      email: `student${i}@example.com`,
    });
  }

  // Tạo 2 giáo viên
  for (let i = 1; i <= 2; i++) {
    users.push({
      username: `teacher${i}`,
      password: '$2a$10$9CtWDff4uH5jUQcLqpgobObQqrp5EYVdhnr.5EMa4/oKwPrepihPS',
      email: `teacher${i}@example.com`,
    });
  }

  const userPromises = users.map(async (user) => {
    return prisma.user.create({ data: user });
  });

  return await Promise.all(userPromises);
};

const assignRoles = async (userIds) => {
  const studentRole = await prisma.role.findUnique({
    where: { name: 'Student' }, // Tìm role ID cho Student
  });

  const teacherRole = await prisma.role.findUnique({
    where: { name: 'Teacher' }, // Tìm role ID cho Teacher
  });

  const rolePromises = [];

  // Gán vai trò cho sinh viên
  for (let i = 0; i < 18; i++) {
    rolePromises.push(
        prisma.userRole.create({
          data: {
            userId: userIds[i],
            roleId: studentRole.id, // Sử dụng roleId đã lấy được
          },
        })
    );
  }

  // Gán vai trò cho giáo viên
  for (let i = 18; i < 20; i++) {
    rolePromises.push(
        prisma.userRole.create({
          data: {
            userId: userIds[i],
            roleId: teacherRole.id, // Sử dụng roleId đã lấy được
          },
        })
    );
  }

  return await Promise.all(rolePromises);
};


const seedClasses = async () => {
  const classes = [
    { name: 'Class 1', amount: 30 },
    { name: 'Class 2', amount: 25 },
  ];

  const classPromises = classes.map(async (classData) => {
    return prisma.class.create({ data: classData });
  });

  return await Promise.all(classPromises);
};

const seedStudents = async (userIds, classIds) => {
  const students = userIds.slice(0, 18).map((userId, index) => ({
    userId: userId,
    classId: classIds[index % classIds.length], // Phân bổ sinh viên vào các lớp
    name: `Student ${index + 1}`,
    birthDate: new Date(`2005-05-${index + 1}`),
    parentName: `Parent ${index + 1}`,
    level: 'Beginner',
  }));

  await Promise.all(
      students.map(async (student) => {
        await prisma.student.create({ data: student });
      })
  );
};

const seedTeachers = async (userIds, classIds) => {
  const teachers = userIds.slice(18).map((userId, index) => ({
    userId: userId,
    classId: classIds[index % classIds.length], // Phân bổ giáo viên vào các lớp
    name: `Teacher ${index + 1}`,
    dob: new Date('1980-01-01'),
    position: 'Subject Teacher',
  }));

  await Promise.all(
      teachers.map(async (teacher) => {
        await prisma.teacher.create({ data: teacher });
      })
  );
};

const seedDocuments = async () => {
  // Lấy danh sách tất cả giáo viên
  const teachers = await prisma.teacher.findMany();

  const documentPromises = [];

  teachers.forEach((teacher) => {
    for (let i = 1; i <= 10; i++) {
      documentPromises.push(
          prisma.document.create({
            data: {
              teacherId: teacher.id, // Sử dụng teacherId từ cơ sở dữ liệu
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

  const users = await seedUsers();
  const userIds = users.map(user => user.id);
  await assignRoles(userIds);

  const classIds = await seedClasses();

  await seedStudents(userIds, classIds.map(classData => classData.id));
  await seedTeachers(userIds, classIds.map(classData => classData.id));
  await seedDocuments();

  console.log('Seeding completed!');
};

main()
    .catch(e => console.error(e))
    .finally(async () => {
      await prisma.$disconnect();
    });
