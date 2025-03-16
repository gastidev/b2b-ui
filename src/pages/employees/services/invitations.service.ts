import { gastiClient } from '@/lib/api';
import { AxiosError } from 'axios';
import { Invitation } from '../domain/types';

export const getCompanyInvitations = async (
  companyId: string
): Promise<Invitation[]> => {
  try {
    const response = await gastiClient.get(
      `/companies/${companyId}/invitations`
    );
    return response.data as Invitation[];
  } catch (error) {
    const isAxiosError = error instanceof AxiosError;
    if (isAxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
