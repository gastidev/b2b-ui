import { BudgetsViewProps } from '../domain/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Download,
  Plus,
  Search,
  Building2,
} from 'lucide-react';

export function BudgetsView({
  budgets,
  searchTerm,
  setSearchTerm,
  showAddDialog,
  setShowAddDialog,
}: BudgetsViewProps) {
  const totalInitialAmount = budgets.reduce(
    (sum, budget) => sum + budget.initial_amount,
    0
  );
  const totalRemainingAmount = budgets.reduce(
    (sum, budget) => sum + budget.remaining_amount,
    0
  );
  const totalProgress =
    (totalRemainingAmount / totalInitialAmount) * 100;

  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto px-4 py-6'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold mb-1'>
              Presupuestos
            </h1>
            <p className='text-muted-foreground'>
              Gestiona los presupuestos por departamento y
              categoría
            </p>
          </div>
          <div className='flex gap-4 w-full sm:w-auto'>
            <Button
              variant='outline'
              className='flex-1 sm:flex-none'
            >
              <Download className='mr-2 h-4 w-4' />
              Exportar
            </Button>
            <Button
              className='flex-1 sm:flex-none'
              onClick={() => setShowAddDialog(true)}
            >
              <Plus className='mr-2 h-4 w-4' />
              Agregar presupuesto
            </Button>
          </div>
        </div>

        <Card className='p-4 sm:p-8'>
          <div className='space-y-4'>
            {/* Total amount card */}
            <Card className='p-6 mb-6'>
              <div className='flex items-center justify-between mb-4'>
                <div>
                  <h3 className='text-sm font-medium text-muted-foreground'>
                    Presupuesto total
                  </h3>
                  <div className='text-2xl font-bold'>
                    ${totalRemainingAmount.toLocaleString()}
                  </div>
                </div>
                <Building2 className='h-8 w-8 text-primary' />
              </div>
              <div className='space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>
                    Progreso
                  </span>
                  <span className='font-medium'>
                    {Math.round(totalProgress)}%
                  </span>
                </div>
                <Progress
                  value={totalProgress}
                  className='h-2'
                />
              </div>
            </Card>

            <div className='flex items-center gap-4'>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  placeholder='Buscar presupuesto...'
                  className='pl-10'
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />
              </div>
            </div>

            {/* Aquí iría la tabla de presupuestos */}
          </div>
        </Card>
      </main>
    </div>
  );
}
