import { gastiClient } from '@/lib/api';
import { AxiosError } from 'axios';

type RegisterManagerProps = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type RegisterManagerResponseDTO = {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    company_id?: string;
    first_name: string;
    last_name: string;
  };
};

export const registerManager = async ({
  email,
  password,
  first_name,
  last_name,
}: RegisterManagerProps) => {
  try {
    const response = await gastiClient.post(
      '/auth/sign-up',
      {
        email,
        password,
        first_name,
        last_name,
        role: 'MANAGER',
      }
    );

    const data =
      response.data as RegisterManagerResponseDTO;

    if (data.token) {
      sessionStorage.setItem('authorization', data.token);
    }

    return data;
  } catch (error) {
    const isAxiosError = error instanceof AxiosError;
    if (isAxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};
