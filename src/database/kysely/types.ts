import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Book = {
    id: Generated<string>;
    title: string;
    description: string;
    author: string;
    publishingHouse: string;
    coverImageUrl: string | null;
    contentPdfUrl: string | null;
    totalBooks: number | null;
    borrowedBooks: number | null;
    evaluate: number | null;
    bookType: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type BorrowedLog = {
    id: Generated<string>;
    userId: string | null;
    documentId: string;
    borrowDate: Timestamp;
    returnDate: Timestamp | null;
    status: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Class = {
    id: Generated<string>;
    name: string;
    amount: Generated<number | null>;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Comment = {
    id: Generated<string>;
    documentId: string;
    userId: string;
    parentId: string | null;
    content: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Document = {
    id: Generated<string>;
    userId: string;
    type: string | null;
    description: string | null;
    url: string | null;
    metadataUrl: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type DocumentStudent = {
    id: Generated<string>;
    documentId: string;
    userId: string;
    percentage: number | null;
    status: string | null;
    marked: boolean | null;
    startedTime: Timestamp | null;
    lastAccessTime: Timestamp | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Exercise = {
    id: Generated<string>;
    classId: string;
    name: string;
    level: string | null;
    metadataUrl: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
    userId: string | null;
};
export type ExerciseStudent = {
    id: Generated<string>;
    exerciseId: string;
    userId: string;
    grade: number | null;
    markedAt: Timestamp;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Goal = {
    id: Generated<string>;
    documentId: string;
    userId: string;
    description: string | null;
    dueDate: Timestamp | null;
    status: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Librarian = {
    id: Generated<string>;
    userId: string;
    metadataUrl: string | null;
    position: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Mark = {
    id: Generated<string>;
    documentId: string;
    userId: string;
    page: number | null;
    markedAt: Timestamp;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Rating = {
    id: Generated<string>;
    documentId: string;
    userId: string;
    star: number | null;
    ratedAt: Timestamp;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type RefreshToken = {
    id: Generated<string>;
    value: string;
    userId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Request = {
    id: Generated<string>;
    librarianId: string | null;
    userId: string | null;
    bookTitle: string | null;
    description: string | null;
    status: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Role = {
    id: Generated<string>;
    name: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Student = {
    id: Generated<string>;
    userId: string;
    metadataUrl: string | null;
    parentName: string | null;
    level: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Task = {
    id: Generated<string>;
    title: string;
    assignerId: string;
    assigneeId: string;
    status: string | null;
    description: string | null;
    assignedAt: Generated<Timestamp>;
    type: string | null;
    priority: string | null;
    endTime: Timestamp | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Teacher = {
    id: Generated<string>;
    userId: string;
    metadataUrl: string | null;
    position: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type User = {
    id: Generated<string>;
    username: string;
    password: string;
    email: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
    ethnicity: Generated<string>;
    gender: Generated<string>;
    phone: Generated<string>;
    name: string;
    birthDate: Timestamp | null;
    classId: string | null;
};
export type UserRole = {
    userId: string;
    roleId: string;
};
export type DB = {
    books: Book;
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
    refreshTokens: RefreshToken;
    requests: Request;
    roles: Role;
    students: Student;
    tasks: Task;
    teachers: Teacher;
    userRoles: UserRole;
    users: User;
};
