"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClientExtended = exports.customPrismaClient = void 0;
const client_1 = require("@prisma/client");
const prisma_extension_kysely_1 = __importDefault(require("prisma-extension-kysely"));
const kysely_1 = require("kysely");
const customPrismaClient = (prismaClient) => prismaClient.$extends((0, prisma_extension_kysely_1.default)({
    kysely: (driver) => new kysely_1.Kysely({
        dialect: {
            createDriver: () => driver,
            createAdapter: () => new kysely_1.PostgresAdapter(),
            createIntrospector: (db) => new kysely_1.PostgresIntrospector(db),
            createQueryCompiler: () => new kysely_1.PostgresQueryCompiler(),
        },
        plugins: [
            new kysely_1.CamelCasePlugin(),
        ],
    }),
}));
exports.customPrismaClient = customPrismaClient;
class PrismaClientExtended extends client_1.PrismaClient {
    get kysely() {
        if (!this.customPrismaClient)
            this.customPrismaClient = (0, exports.customPrismaClient)(this);
        return this.customPrismaClient.$kysely;
    }
}
exports.PrismaClientExtended = PrismaClientExtended;
//# sourceMappingURL=prisma.extended.js.map