import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useFetchInvitations } from '../../hooks/use-fetch-invitations';
import { format } from 'date-fns';

export function InvitationsTable() {
  const { invitations, isLoading } = useFetchInvitations();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
      </div>
    );
  }

  if (!invitations.length) {
    return null;
  }

  return (
    <Card className='mt-8'>
      <CardHeader>
        <CardTitle>Invitaciones pendientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invitations.map((invitation) => (
                <TableRow key={invitation.id}>
                  <TableCell className='font-medium'>
                    {invitation.metadata.first_name}{' '}
                    {invitation.metadata.last_name}
                  </TableCell>
                  <TableCell>{invitation.email}</TableCell>
                  <TableCell>
                    {invitation.department_id ||
                      'Sin departamento'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invitation.role === 'MANAGER'
                          ? 'default'
                          : 'outline'
                      }
                    >
                      {invitation.role === 'MANAGER'
                        ? 'Gerente'
                        : 'Colaborador'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invitation.status === 'PENDING'
                          ? 'outline'
                          : invitation.status === 'ACCEPTED'
                          ? 'default'
                          : 'destructive'
                      }
                    >
                      {invitation.status === 'PENDING'
                        ? 'Pendiente'
                        : invitation.status === 'ACCEPTED'
                        ? 'Aceptada'
                        : 'Rechazada'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(
                      new Date(invitation.created_at),
                      'dd/MM/yyyy'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
