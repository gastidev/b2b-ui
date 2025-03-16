import { gastiClient } from '@/lib/api';

export const getInvitation = async (token: string) => {
  try {
    const response = await gastiClient.get(
      `/auth/invitations/${token}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
