import { gastiClient } from '@/lib/api';
import { clearSession, User } from '@/lib/auth';

interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  async login(
    email: string,
    password: string
  ): Promise<LoginResponse> {
    const { data } = await gastiClient.post<LoginResponse>(
      '/auth/login',
      {
        email,
        password,
      }
    );
    return data;
  },

  async register(
    email: string,
    password: string
  ): Promise<LoginResponse> {
    const { data } = await gastiClient.post<LoginResponse>(
      '/auth/register',
      {
        email,
        password,
      }
    );
    return data;
  },
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
