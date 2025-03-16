import { gastiClient } from '@/lib/api';
import { Employee } from '@/lib/data';
import { AxiosError } from 'axios';

export const getEmployees = async (companyId: string) => {
  try {
    const response = await gastiClient.get(
      `/companies/${companyId}/employees`
    );
    return response.data as Employee[];
  } catch (error) {
    console.log(error);
    const isAxiosError = error instanceof AxiosError;
    if (isAxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export interface InviteEmployeeData {
  companyId: string;
  email: string;
  firstName: string;
  lastName: string;
  departmentId?: string;
  role?: 'MANAGER' | 'COLLABORATOR';
}

export const inviteEmployee = async ({
  companyId,
  email,
  firstName,
  lastName,
  departmentId,
  role = 'COLLABORATOR',
}: InviteEmployeeData) => {
  try {
    const response = await gastiClient.post(
      `/companies/${companyId}/employees/invite`,
      {
        email,
        first_name: firstName,
        last_name: lastName,
        department_id: departmentId,
        role,
      }
    );
    return response.data as Employee;
  } catch (error) {
    const isAxiosError = error instanceof AxiosError;
    if (isAxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const createEmployee = async (
  companyId: string,
  employee: Omit<
    Employee,
    'id' | 'created_at' | 'updated_at'
  >
) => {
  try {
    const response = await gastiClient.post(
      `/companies/${companyId}/employees/invite`,
      employee
    );
    return response.data as Employee;
  } catch (error) {
    const isAxiosError = error instanceof AxiosError;
    if (isAxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const updateEmployee = async (
  companyId: string,
  employeeId: string,
  employee: Partial<Employee>
) => {
  try {
    const response = await gastiClient.patch(
      `/companies/${companyId}/employees/${employeeId}`,
      employee
    );
    return response.data as Employee;
  } catch (error) {
    const isAxiosError = error instanceof AxiosError;
    if (isAxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const deleteEmployee = async (
  companyId: string,
  employeeId: string
) => {
  try {
    await gastiClient.delete(
      `/companies/${companyId}/employees/${employeeId}`
    );
  } catch (error) {
    const isAxiosError = error instanceof AxiosError;
    if (isAxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
