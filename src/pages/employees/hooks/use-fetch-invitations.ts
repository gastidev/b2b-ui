import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/pages/auth/store/auth.store';
import { getCompanyInvitations } from '../services/invitations.service';

export function useFetchInvitations() {
  const { user } = useAuthStore();
  const companyId = user?.company_id;

  const { data: invitations = [], isLoading } = useQuery({
    queryKey: ['invitations', companyId],
    queryFn: () =>
      companyId
        ? getCompanyInvitations(companyId)
        : Promise.resolve([]),
    enabled: !!companyId,
  });

  return {
    invitations,
    isLoading,
    companyId,
  };
}
