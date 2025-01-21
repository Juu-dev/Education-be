import path from "path";
import fs from "fs";

const readFileJson = (pathFile: string) => {
    const pathRefer = path.join(__dirname, pathFile);
    const data = fs.readFileSync(pathRefer, 'utf-8');
    return JSON.parse(data);
};

const getDataFunctions = (files: { [key: string]: string }) => {
    const dataFunctions: { [key: string]: () => any } = {};
    for (const [key, filePath] of Object.entries(files)) {
        dataFunctions[key] = () => readFileJson(filePath);
    }
    return dataFunctions;
};

const files = {
    getClasses: '../data-seed/1_classes.json',
    getRoles: '../data-seed/2_roles.json',
    getAccount: '../data-seed/3_accounts.json',
    getBooks: '../data-seed/4_books.json',
    getQuizzes: '../data-seed/5_quizzes.json',
    getExercises: '../data-seed/6_exercises.json',
    getTasks: '../data-seed/7_tasks.json',
    getDocuments: '../data-seed/8_documents.json',
};

export const {
    getClasses,
    getRoles,
    getAccount,
    getBooks,
    getQuizzes,
    getExercises,
    getTasks,
    getDocuments,
} = getDataFunctions(files);
