import {
  IActionType,
  INotificationType,
  IPermission,
  IRole,
} from "../types/global.typing";

export const getActionTypeName = (
  actionTypes: IActionType[],
  actionTypeId: number
): string => {
  const actionType = actionTypes.find((type) => type.id === actionTypeId);
  return actionType ? actionType.name : "";
};

export const getRoleName = (roles: IRole[], roleId: number): string => {
  const role = roles.find((type) => type.id === roleId);
  return role ? role.name : "";
};

export const getPermissionName = (
  permissions: IPermission[],
  permissionId: number
): string => {
  const permission = permissions.find((type) => type.id === permissionId);
  return permission ? permission.name : "";
};

export const getNotificationTypeName = (
  notificationTypes: INotificationType[],
  notificationTypeId: number
): string => {
  const notificationType = notificationTypes.find(
    (type) => type.id === notificationTypeId
  );
  return notificationType ? notificationType.name : "";
};
