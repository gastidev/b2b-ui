import { useQuery } from '@tanstack/react-query';
import { getInvitation } from '../services/get-invitation.service';
import { Invitation } from '../types/invitation';

export function useRejectedInvitation(
  token: string | null
) {
  return useQuery<Invitation>({
    queryKey: ['invitation', token],
    queryFn: () => getInvitation(token || ''),
    enabled: !!token,
  });
}
