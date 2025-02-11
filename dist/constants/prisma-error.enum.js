"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaError = void 0;
var PrismaError;
(function (PrismaError) {
    PrismaError["RecordDoesNotExist"] = "P2025";
    PrismaError["UniqueConstraintViolated"] = "P2002";
    PrismaError["UniqueConstraintFailed"] = "P2002";
    PrismaError["ForeignKeyConstraintViolated"] = "P2003";
    PrismaError["ConnectedRecordsNotFound"] = "P2018";
})(PrismaError = exports.PrismaError || (exports.PrismaError = {}));
//# sourceMappingURL=prisma-error.enum.js.map