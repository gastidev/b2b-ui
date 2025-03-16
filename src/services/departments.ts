import { gastiClient } from '@/lib/api';
import { AxiosError } from 'axios';

export interface Department {
  id?: string;
  company_id: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export const departmentsService = {
  getDepartments: async (
    companyId: string
  ): Promise<Department[]> => {
    try {
      const response = await gastiClient.get(
        `/companies/${companyId}/departments`
      );
      return response.data;
    } catch (error) {
      const isAxiosError = error instanceof AxiosError;
      if (isAxiosError) {
        throw new Error(error.response?.data.message);
      }
      throw error;
    }
  },

  createDepartment: async (
    companyId: string,
    department: Omit<Department, 'id' | 'company_id'>
  ): Promise<Department> => {
    try {
      const response = await gastiClient.post(
        `/companies/${companyId}/departments`,
        department
      );
      return response.data;
    } catch (error) {
      const isAxiosError = error instanceof AxiosError;
      if (isAxiosError) {
        throw new Error(error.response?.data.message);
      }
      throw error;
    }
  },

  updateDepartment: async (
    companyId: string,
    departmentId: string,
    department: Partial<Department>
  ): Promise<Department> => {
    try {
      const response = await gastiClient.put(
        `/companies/${companyId}/departments/${departmentId}`,
        department
      );
      return response.data;
    } catch (error) {
      const isAxiosError = error instanceof AxiosError;
      if (isAxiosError) {
        throw new Error(error.response?.data.message);
      }
      throw error;
    }
  },

  deleteDepartment: async (
    companyId: string,
    departmentId: string
  ): Promise<void> => {
    try {
      await gastiClient.delete(
        `/companies/${companyId}/departments/${departmentId}`
      );
    } catch (error) {
      const isAxiosError = error instanceof AxiosError;
      if (isAxiosError) {
        throw new Error(error.response?.data.message);
      }
      throw error;
    }
  },
};
