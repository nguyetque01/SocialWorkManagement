import httpModule from "../helpers/http.module";
import { IPermission, ICreatePermission } from "../types/global.typing";

const API_ENDPOINT = "/Permissions";

const PermissionService = {
  getAllPermissions: async (): Promise<IPermission[]> => {
    try {
      const response = await httpModule.get<IPermission[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch permissions");
    }
  },

  getPermissionById: async (permissionId: number): Promise<IPermission> => {
    try {
      const response = await httpModule.get<IPermission>(
        `${API_ENDPOINT}/${permissionId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch permission");
    }
  },

  createPermission: async (
    PermissionData: ICreatePermission
  ): Promise<IPermission> => {
    try {
      const response = await httpModule.post<IPermission>(
        API_ENDPOINT,
        PermissionData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create permission");
    }
  },

  updatePermission: async (
    permissionId: number,
    PermissionData: ICreatePermission
  ): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${permissionId}`, PermissionData);
    } catch (error) {
      throw new Error("Failed to update permission");
    }
  },

  deletePermission: async (permissionId: number): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${permissionId}`);
    } catch (error) {
      throw new Error("Failed to delete permission");
    }
  },
};

export default PermissionService;
