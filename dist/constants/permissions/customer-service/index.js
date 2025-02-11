"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerServicePermission = void 0;
const tiers_permission_enum_1 = __importDefault(require("./tiers-permission.enum"));
const customers_permission_enum_1 = __importDefault(require("./customers-permission.enum"));
const groups_pesmission_enum_1 = __importDefault(require("./groups-pesmission.enum"));
const note_permission_enum_1 = __importDefault(require("./note-permission.enum"));
exports.CustomerServicePermission = {
    ...customers_permission_enum_1.default,
    ...groups_pesmission_enum_1.default,
    ...note_permission_enum_1.default,
    ...tiers_permission_enum_1.default,
};
//# sourceMappingURL=index.js.map