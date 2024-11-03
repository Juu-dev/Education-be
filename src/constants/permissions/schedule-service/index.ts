import WorkSchedulesPermission from './work-schedules-permission.enum';
import WorkShiftsPermission from './work-shifts-permission.enum';
import AppointmentsPermission from './appointments-permission.enum';
import SettingsPermission from './settings-permission.enum';

export const ScheduleServicePermission = {
  ...WorkSchedulesPermission,
  ...WorkShiftsPermission,
  ...AppointmentsPermission,
  ...SettingsPermission,
};

export type ScheduleServicePermissionType =
  | WorkSchedulesPermission
  | WorkShiftsPermission
  | AppointmentsPermission
  | SettingsPermission;
