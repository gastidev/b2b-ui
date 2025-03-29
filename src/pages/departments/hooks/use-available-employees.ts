import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/pages/auth/store/auth.store';
import { gastiClient } from '@/lib/api';

export function useAvailableEmployees() {
  const { user } = useAuthStore();
  const companyId = user?.company_id;

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['employees', companyId],
    queryFn: async () => {
      const response = await gastiClient.get(
        `/companies/${companyId}/employees`
      );
      return response.data;
    },
    enabled: !!companyId,
  });

  return {
    employees,
    isLoading,
  };
}
