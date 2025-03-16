import { TransactionsViewProps } from '../domain/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Download,
  Filter,
  Plus,
  Search,
} from 'lucide-react';
import { FilterPanel } from './FilterPanel';

export function TransactionsView({
  transactions,
  searchTerm,
  setSearchTerm,
  filterGroup,
  setFilterGroup,
  showFilters,
  setShowFilters,
  pageSize,
  setPageSize,
}: TransactionsViewProps) {
  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto px-4 py-6'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold mb-1'>
              Transacciones
            </h1>
            <p className='text-muted-foreground'>
              Gestiona todas las transacciones de tu empresa
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
            <Button className='flex-1 sm:flex-none'>
              <Plus className='mr-2 h-4 w-4' />
              Agregar transacción
            </Button>
          </div>
        </div>

        <Card className='p-4 sm:p-8'>
          <div className='space-y-4'>
            <div className='flex flex-col gap-4 lg:hidden'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  placeholder='Buscar transacción...'
                  className='pl-10'
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />
              </div>
              <div className='flex gap-2'>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant='outline'
                      className='flex-1'
                    >
                      <Filter className='h-4 w-4 mr-2' />
                      Filtros{' '}
                      {filterGroup.filters.length > 0 &&
                        `(${filterGroup.filters.length})`}
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side='left'
                    className='w-full sm:max-w-lg'
                  >
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                    </SheetHeader>
                    <div className='mt-4'>
                      <FilterPanel
                        transactions={transactions}
                        filterGroup={filterGroup}
                        onFilterChange={setFilterGroup}
                        show={true}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                <Select
                  value={pageSize}
                  onValueChange={setPageSize}
                >
                  <SelectTrigger className='w-[140px]'>
                    <SelectValue placeholder='Registros' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='10'>
                      10 registros
                    </SelectItem>
                    <SelectItem value='25'>
                      25 registros
                    </SelectItem>
                    <SelectItem value='50'>
                      50 registros
                    </SelectItem>
                    <SelectItem value='100'>
                      100 registros
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='hidden lg:flex items-center gap-4'>
              <Button
                variant={
                  showFilters ? 'secondary' : 'outline'
                }
                className='gap-2'
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className='h-4 w-4' />
                Filtros{' '}
                {filterGroup.filters.length > 0 &&
                  `(${filterGroup.filters.length})`}
              </Button>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  placeholder='Buscar transacción...'
                  className='pl-10'
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />
              </div>
              <Select
                value={pageSize}
                onValueChange={setPageSize}
              >
                <SelectTrigger className='w-[140px]'>
                  <SelectValue placeholder='Registros' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='10'>
                    10 registros
                  </SelectItem>
                  <SelectItem value='25'>
                    25 registros
                  </SelectItem>
                  <SelectItem value='50'>
                    50 registros
                  </SelectItem>
                  <SelectItem value='100'>
                    100 registros
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Aquí iría la tabla de transacciones */}
          </div>
        </Card>
      </main>
    </div>
  );
}
