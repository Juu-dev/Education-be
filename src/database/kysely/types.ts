import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Answer = {
    id: Generated<string>;
    userId: string;
    exerciseId: string;
    mark: number | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Book = {
    id: Generated<string>;
    title: string;
    description: string;
    author: string;
    publishingHouse: string;
    coverImageUrl: string | null;
    contentPdfUrl: string | null;
    type: string | null;
    evaluate: number | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type BookImport = {
    id: Generated<string>;
    title: string;
    yearOfPublication: string;
    amount: number | null;
    borrowedAmount: number | null;
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
    name: string;
    description: string;
    timeOut: number;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
    assignerId: string;
    classAssigneeId: string;
    quizId: string;
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
export type Option = {
    id: Generated<string>;
    questionId: string;
    content: string;
    isCorrect: boolean;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Question = {
    id: Generated<string>;
    quizId: string | null;
    content: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type QuestionAnswer = {
    id: Generated<string>;
    answerId: string;
    questionId: string;
    selectedOptionId: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Quiz = {
    id: Generated<string>;
    title: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
    creatorId: string | null;
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
    status: string | null;
    description: string | null;
    assignedAt: Generated<Timestamp>;
    type: string | null;
    priority: string | null;
    endTime: Timestamp | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
    assignerId: string;
    assigneeId: string;
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
    isDeleted: Generated<boolean | null>;
    deletedAt: Timestamp | null;
};
export type UserRole = {
    userId: string;
    roleId: string;
};
export type DB = {
    answers: Answer;
    books: Book;
    booksImports: BookImport;
    borrowedLogs: BorrowedLog;
    classes: Class;
    comments: Comment;
    documentStudents: DocumentStudent;
    documents: Document;
    exercises: Exercise;
    goals: Goal;
    librarians: Librarian;
    marks: Mark;
    options: Option;
    questionAnswers: QuestionAnswer;
    questions: Question;
    quizzes: Quiz;
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
