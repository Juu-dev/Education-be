import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type BorrowedLog = {
    id: Generated<string>;
    studentId: string;
    documentId: string;
    borrowDate: Timestamp;
    returnDate: Timestamp | null;
    status: string | null;
};
export type Class = {
    id: Generated<string>;
    name: string;
    amount: number | null;
};
export type Comment = {
    id: Generated<string>;
    documentId: string;
    studentId: string;
    parentId: string | null;
    content: string;
    createdAt: Timestamp;
};
export type Document = {
    id: Generated<string>;
    teacherId: string | null;
    type: string | null;
    description: string | null;
    createdAt: Timestamp;
    url: string | null;
    metadataUrl: string | null;
};
export type DocumentStudent = {
    id: Generated<string>;
    documentId: string;
    studentId: string;
    percentage: number | null;
    status: string | null;
    marked: boolean | null;
    startedTime: Timestamp | null;
    lastAccessTime: Timestamp | null;
};
export type Exercise = {
    id: Generated<string>;
    classId: string;
    name: string;
    level: string | null;
    metadataUrl: string | null;
    createdAt: Timestamp;
    teacherId: string | null;
};
export type ExerciseStudent = {
    id: Generated<string>;
    exerciseId: string;
    studentId: string;
    grade: number | null;
    markedAt: Timestamp;
};
export type Goal = {
    id: Generated<string>;
    documentId: string;
    studentId: string;
    description: string | null;
    dueDate: Timestamp | null;
    createdAt: Timestamp;
    status: string | null;
};
export type Librarian = {
    id: Generated<string>;
    userId: string | null;
    metadataUrl: string | null;
    name: string;
    dob: Timestamp | null;
    position: string | null;
};
export type Mark = {
    id: Generated<string>;
    documentId: string;
    studentId: string;
    page: number | null;
    markedAt: Timestamp;
};
export type Rating = {
    id: Generated<string>;
    documentId: string;
    studentId: string;
    star: number | null;
    ratedAt: Timestamp;
};
export type Request = {
    id: Generated<string>;
    librarianId: string | null;
    studentId: string | null;
    bookTitle: string | null;
    description: string | null;
    status: string | null;
    createdAt: Timestamp;
};
export type Role = {
    id: Generated<string>;
    name: string;
};
export type Student = {
    id: Generated<string>;
    userId: string | null;
    classId: string | null;
    metadataUrl: string | null;
    name: string;
    birthDate: Timestamp | null;
    parentName: string | null;
    level: string | null;
};
export type Task = {
    id: Generated<string>;
    assignerId: string;
    assigneeId: string;
    status: string | null;
    taskDescription: string | null;
    assignedAt: Timestamp;
    startTime: Timestamp | null;
    endTime: Timestamp | null;
};
export type Teacher = {
    id: Generated<string>;
    userId: string | null;
    classId: string | null;
    metadataUrl: string | null;
    name: string;
    dob: Timestamp | null;
    position: string | null;
};
export type User = {
    id: Generated<string>;
    username: string;
    password: string;
    email: string;
};
export type UserRole = {
    userId: string;
    roleId: string;
};
export type DB = {
    borrowedLogs: BorrowedLog;
    classes: Class;
    comments: Comment;
    documentStudents: DocumentStudent;
    documents: Document;
    exerciseStudents: ExerciseStudent;
    exercises: Exercise;
    goals: Goal;
    librarians: Librarian;
    marks: Mark;
    ratings: Rating;
    requests: Request;
    roles: Role;
    students: Student;
    tasks: Task;
    teachers: Teacher;
    userRoles: UserRole;
    users: User;
};
