import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/pages/auth/store/auth.store';
import { getEmployees } from '../services/employees.service';

export function useFetchEmployees() {
  const { user } = useAuthStore();
  const companyId = user?.company_id;

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['employees', companyId],
    queryFn: () =>
      companyId
        ? getEmployees(companyId)
        : Promise.resolve([]),
    enabled: !!companyId,
  });

  return {
    employees,
    isLoading,
    companyId,
  };
}
