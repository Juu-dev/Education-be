"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.includesConfig = void 0;
exports.includesConfig = {
    user: {
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
    class: {
        user: true,
        exercises: true,
    },
    student: {
        user: {
            include: {
                class: true,
            }
        },
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
    quiz: {
        _count: {
            select: { questions: true },
        },
        questions: {
            include: {
                options: true
            }
        }
    },
    exercise: {
        _count: {
            select: {
                answers: true
            }
        },
        answers: {
            select: {
                userId: true,
            }
        }
    }
};
//# sourceMappingURL=includesConfig.js.map