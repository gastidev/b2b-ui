import { gastiClient } from '@/lib/api';
import { Employee } from '@/lib/data';
import { AxiosError } from 'axios';

export interface Department {
  id?: string;
  company_id: string;
  name: string;

  collaborators: Employee[];

  created_at?: Date;
  updated_at?: Date;
}

export const getDepartments = async (
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
};

export const createDepartment = async (
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
};

export const updateDepartment = async (
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
};

export const deleteDepartment = async (
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
};

export const updateEmployeeDepartment = async (
  companyId: string,
  employeeId: string,
  departmentId: string | null
): Promise<void> => {
  try {
    await gastiClient.post(
      `/companies/${companyId}/employees/${employeeId}/department`,
      { department_id: departmentId }
    );
  } catch (error) {
    const isAxiosError = error instanceof AxiosError;
    if (isAxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
