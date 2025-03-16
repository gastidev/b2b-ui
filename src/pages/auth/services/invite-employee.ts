import { gastiClient } from '@/lib/api';
import { AxiosError } from 'axios';

export const inviteEmployee = async (
  companyId: string,
  employeeEmail: string,
  firstName: string,
  lastName: string
) => {
  try {
    const { data } = await gastiClient.post(
      `/companies/${companyId}/employees/invite`,
      {
        email: employeeEmail,
        first_name: firstName,
        last_name: lastName,
        role: 'COLLABORATOR',
      }
    );

    return data;
  } catch (error) {
    const isAxiosError = error instanceof AxiosError;
    if (isAxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
};
