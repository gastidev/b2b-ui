import { createAuthClient } from 'better-auth/react';
import { bearer } from 'better-auth/plugins';
import { gastiClient } from './api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/pages/auth/store/auth.store';

export interface Profile {
  first_name: string;
  last_name: string;
}

export interface User {
  id: string;
  profile: Profile;
  email: string;
  role: string;
  phone: string;
  company_id?: string;
}

export interface Session {
  token: string;
  user: User;
}

export const TOKEN_KEY = 'authorization';
export const SESSION_KEY = 'session';

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [bearer()],
  fetchOptions: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem(
        TOKEN_KEY
      )}`,
    },
  },
});

export const getSession =
  async (): Promise<Session | null> => {
    try {
      // Primero intentamos obtener del Zustand store
      const authStore = useAuthStore.getState();
      if (
        authStore.isAuthenticated &&
        authStore.token &&
        authStore.user
      ) {
        return {
          token: authStore.token,
          user: authStore.user as unknown as User,
        };
      }

      const token = sessionStorage.getItem(TOKEN_KEY);
      if (!token) return null;

      const cachedSession =
        sessionStorage.getItem(SESSION_KEY);
      if (cachedSession) {
        const session = JSON.parse(cachedSession);
        // Sincronizamos con Zustand
        useAuthStore.getState().setAuth({
          token: session.token,
          user: session.user,
        });
        return session;
      }

      const response = await gastiClient.get(
        '/api/auth/get-session'
      );
      const session = response.data;

      if (session) {
        sessionStorage.setItem(
          SESSION_KEY,
          JSON.stringify(session)
        );
        // Sincronizamos con Zustand
        useAuthStore.getState().setAuth({
          token: session.token,
          user: session.user,
        });
      }

      return session;
    } catch (error) {
      console.error('Error getting session:', error);
      clearSession();
      return null;
    }
  };

export const setSession = (session: Session) => {
  sessionStorage.setItem(TOKEN_KEY, session.token);
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );
  // Sincronizamos con Zustand
  useAuthStore.getState().setAuth({
    token: session.token,
    user: session.user,
  });
};

export const clearSession = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  // Limpiamos Zustand
  useAuthStore.getState().logout();
};

export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: getSession,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
    retry: false,
  });
};

export const useRequireAuth = (
  redirectTo: string = '/'
) => {
  const { data: session, isLoading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !session) {
      navigate(redirectTo, { replace: true });
    }
  }, [session, isLoading, navigate, redirectTo]);

  return { session, isLoading };
};

export const useRequireNoAuth = (
  redirectTo: string = '/dashboard'
) => {
  const { data: session, isLoading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && session) {
      navigate(redirectTo, { replace: true });
    }
  }, [session, isLoading, navigate, redirectTo]);

  return { session, isLoading };
};
