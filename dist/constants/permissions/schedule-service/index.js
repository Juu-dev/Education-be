"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleServicePermission = void 0;
const work_schedules_permission_enum_1 = __importDefault(require("./work-schedules-permission.enum"));
const work_shifts_permission_enum_1 = __importDefault(require("./work-shifts-permission.enum"));
const appointments_permission_enum_1 = __importDefault(require("./appointments-permission.enum"));
const settings_permission_enum_1 = __importDefault(require("./settings-permission.enum"));
exports.ScheduleServicePermission = {
    ...work_schedules_permission_enum_1.default,
    ...work_shifts_permission_enum_1.default,
    ...appointments_permission_enum_1.default,
    ...settings_permission_enum_1.default,
};
//# sourceMappingURL=index.js.map