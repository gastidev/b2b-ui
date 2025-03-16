import { RegisterCompanyResponseDTO } from '@/pages/auth/services/register-company';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  step: number;
  userData: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  companyData: RegisterCompanyResponseDTO | null;
  setStep: (step: number) => void;
  setUserData: (data: OnboardingState['userData']) => void;
  setCompanyData: (
    data: OnboardingState['companyData']
  ) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: 1,
      userData: null,
      companyData: null,
      setStep: (step) => set({ step }),
      setUserData: (userData) => set({ userData }),
      setCompanyData: (companyData) => set({ companyData }),
      reset: () =>
        set({ step: 1, userData: null, companyData: null }),
    }),
    {
      name: 'onboarding-storage',
    }
  )
);
