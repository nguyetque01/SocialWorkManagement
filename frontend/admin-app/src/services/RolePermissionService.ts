import httpModule from "../helpers/http.module";
import { IRolePermission, ICreateRolePermission } from "../types/global.typing";

const API_ENDPOINT = "/RolePermissions";

const RolePermissionService = {
  getAllRolePermissions: async (): Promise<IRolePermission[]> => {
    try {
      const response = await httpModule.get<IRolePermission[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch role permissions");
    }
  },

  getRolePermissionById: async (
    rolePermissionId: number
  ): Promise<IRolePermission> => {
    try {
      const response = await httpModule.get<IRolePermission>(
        `${API_ENDPOINT}/${rolePermissionId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch role permission");
    }
  },

  createRolePermission: async (
    RolePermissionData: ICreateRolePermission
  ): Promise<IRolePermission> => {
    try {
      const response = await httpModule.post<IRolePermission>(
        API_ENDPOINT,
        RolePermissionData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create role permission");
    }
  },

  updateRolePermission: async (
    rolePermissionId: number,
    RolePermissionData: ICreateRolePermission
  ): Promise<void> => {
    try {
      await httpModule.put(
        `${API_ENDPOINT}/${rolePermissionId}`,
        RolePermissionData
      );
    } catch (error) {
      throw new Error("Failed to update role permission");
    }
  },

  deleteRolePermission: async (rolePermissionId: number): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${rolePermissionId}`);
    } catch (error) {
      throw new Error("Failed to delete role permission");
    }
  },
};

export default RolePermissionService;
