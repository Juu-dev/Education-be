// includesConfig.ts
export const includesConfig = {
  User: {
    roles: {
      include: {
        role: true,
      },
    },
    librarian: true,
    student: true,
    teacher: true,
    class: true,
  },
  Role: {
    users: {
      include: {
        user: true,
      },
    },
  },
  UserRole: {
    user: true,
    role: true,
  },
  Class: {
    users: true,
    exercises: true,
  },
  student: {
    user: {
      include: {
        class: true,
      }
    },
  },
  Teacher: {
    user: true,
    class: true,
    documents: true,
    tasks: true,
    exercises: true,
  },
  Librarian: {
    user: true,
  },
  document: {
    teacher: true,
    ratings: true,
    comments: true,
    goals: true,
    marks: true,
    documentStudents: {
      include: {
        student: true,
      },
    },
    BorrowedLog: true,
  },
  Rating: {
    document: true,
    student: true,
  },
  Comment: {
    document: true,
    student: true,
  },
  DocumentStudent: {
    document: true,
    student: true,
  },
  Goal: {
    document: true,
    student: true,
  },
  Mark: {
    document: true,
    student: true,
  },
  Task: {
    assigner: true,
    assignee: true,
  },
  Request: {
    student: true,
  },
  BorrowedLog: {
    student: true,
    document: true,
  },
  Exercise: {
    class: true,
    exerciseStudents: {
      include: {
        student: true,
      },
    },
    Teacher: true,
  },
  ExerciseStudent: {
    exercise: true,
    student: true,
  },
};
