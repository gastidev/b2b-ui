import { gastiClient } from '@/lib/api';
import { AxiosError } from 'axios';

export interface AcceptInvitationDTO {
  token: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
}

export interface InvitationResponseDTO {
  token: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    company_id: string;
  };
}

export const acceptInvitation = async (
  data: AcceptInvitationDTO
): Promise<InvitationResponseDTO> => {
  try {
    const response = await gastiClient.post(
      '/auth/invitations/accept',
      data
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

export const rejectInvitation = async (
  token: string
): Promise<void> => {
  try {
    await gastiClient.post('/auth/invitations/reject', {
      token,
    });
  } catch (error) {
    const isAxiosError = error instanceof AxiosError;
    if (isAxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
