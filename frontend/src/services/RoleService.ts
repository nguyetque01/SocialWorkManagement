import httpModule from "../helpers/http.module";
import { IRole, ICreateRole } from "../types/global.typing";

const API_ENDPOINT = "/Roles";

const RoleService = {
  getAllRoles: async (): Promise<IRole[]> => {
    try {
      const response = await httpModule.get<IRole[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch roles");
    }
  },

  getRoleById: async (roleId: number): Promise<IRole> => {
    try {
      const response = await httpModule.get<IRole>(`${API_ENDPOINT}/${roleId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch role");
    }
  },

  createRole: async (RoleData: ICreateRole): Promise<IRole> => {
    try {
      const response = await httpModule.post<IRole>(API_ENDPOINT, RoleData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create role");
    }
  },

  updateRole: async (roleId: number, RoleData: ICreateRole): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${roleId}`, RoleData);
    } catch (error) {
      throw new Error("Failed to update role");
    }
  },

  deleteRole: async (roleId: number): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${roleId}`);
    } catch (error) {
      throw new Error("Failed to delete role");
    }
  },
};

export default RoleService;
