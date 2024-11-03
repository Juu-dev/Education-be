import TiersPermission from './tiers-permission.enum';
import CustomersPermission from './customers-permission.enum';
import GroupsPermission from './groups-pesmission.enum';
import NotePermission from './note-permission.enum';

export const CustomerServicePermission = {
  ...CustomersPermission,
  ...GroupsPermission,
  ...NotePermission,
  ...TiersPermission,
};

export type CustomerServicePermissionType =
  | CustomersPermission
  | GroupsPermission
  | NotePermission
  | TiersPermission;
