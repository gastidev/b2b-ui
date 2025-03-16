import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';

// Componentes
import { InvitationsTable } from './components/invitation-table/invitations-table';
import { InviteEmployeeDialog } from './components/invite-employee-dialog';
import { useAuthStore } from '../auth/store/auth.store';
import { EmployeesTable } from './components/table/employees-table';

export function EmployeesPage() {
  const { user } = useAuthStore();
  const companyId = user?.company_id;

  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto px-4 py-6'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold mb-1'>
              Colaboradores
            </h1>
            <p className='text-muted-foreground'>
              Gestiona la información de los colaboradores
              de tu empresa
            </p>
          </div>
          <div className='flex gap-4 w-full sm:w-auto'>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='outline'
                  className='flex-1 sm:flex-none'
                >
                  <Download className='mr-2 h-4 w-4' />
                  Exportar
                </Button>
              </DialogTrigger>
            </Dialog>
            <InviteEmployeeDialog
              companyId={companyId || ''}
            />
          </div>
        </div>

        <EmployeesTable
          onEdit={() => {}}
          onDelete={() => {}}
        />

        <InvitationsTable />
      </main>
    </div>
  );
}
