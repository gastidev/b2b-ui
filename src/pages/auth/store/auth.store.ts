import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LoginResponseDTO } from '../services/auth.service';

interface AuthState {
  token: string | null;
  user: LoginResponseDTO['user'] | null;
  isAuthenticated: boolean;
  setAuth: (data: {
    token: string;
    user: LoginResponseDTO['user'];
  }) => void;
  setUser: (user: LoginResponseDTO['user'] | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (data) =>
        set({
          token: data.token,
          user: data.user,
          isAuthenticated: true,
        }),
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
