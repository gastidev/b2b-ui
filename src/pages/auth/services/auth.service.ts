import { gastiClient } from '@/lib/api';
import { AxiosError } from 'axios';
import { setSession, clearSession } from '@/lib/auth';

export interface LoginResponseDTO {
  token: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    company_id?: string;
  };
}

interface LoginProps {
  email: string;
  password: string;
}

export const login = async ({
  email,
  password,
}: LoginProps) => {
  try {
    const response = await gastiClient.post(
      '/auth/sign-in',
      {
        email,
        password,
      }
    );

    const data = response.data as LoginResponseDTO;

    // Guardamos la sesión completa
    setSession({
      token: data.token,
      user: {
        id: data.user.id,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        email: data.user.email,
        role: data.user.role as 'manager' | 'employee',
        company_id: data.user.company_id,
      },
    });

    return data;
  } catch (error) {
    const isAxiosError = error instanceof AxiosError;
    if (isAxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
};

export const signOut = async () => {
  try {
    await gastiClient.post('/auth/sign-out');
  } catch (error) {
    console.error('Error en sign-out:', error);
  } finally {
    clearSession();
  }
};
