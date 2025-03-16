import { useState } from 'react';
import { format } from 'date-fns';
import {
  Download,
  Plus,
  Search,
  Pencil,
  Trash2,
  Building2,
  Mail,
  Copy,
  Check,
  Globe2,
  ChevronLeft,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { providers, Provider } from '@/lib/data/providers';
import { transactions, Transaction } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';

interface ProviderFormData {
  name: string;
  email: string;
  tax_number: string;
  country: string;
  alias: string;
  cbu: string;
}

const initialFormData: ProviderFormData = {
  name: '',
  email: '',
  tax_number: '',
  country: 'AR',
  alias: '',
  cbu: '',
};

const countries = [
  { code: 'AR', name: 'Argentina' },
  { code: 'BR', name: 'Brasil' },
  { code: 'CL', name: 'Chile' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Perú' },
  { code: 'CO', name: 'Colombia' },
  { code: 'MX', name: 'México' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'ES', name: 'España' },
].sort((a, b) => a.name.localeCompare(b.name));

function CopyButton({
  value,
  tooltip,
}: {
  value: string;
  tooltip: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='h-4 w-4 hover:bg-transparent'
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
          >
            {copied ? (
              <Check className='h-3 w-3 text-green-500' />
            ) : (
              <Copy className='h-3 w-3 text-muted-foreground' />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copiar {tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface ProviderAnalysis {
  totalAmount: number;
  pendingAmount: number;
  paidAmount: number;
  invoicedAmount: number;
  debt: number;
  transactions: Transaction[];
}

function ProviderAnalysisView({
  provider,
  onBack,
}: {
  provider: Provider;
  onBack: () => void;
}) {
  const providerTransactions = transactions.filter(
    (t) => t.provider_id === provider.id
  );

  const analysis: ProviderAnalysis = {
    totalAmount: providerTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    ),
    pendingAmount: providerTransactions
      .filter((t) => !t.payment)
      .reduce((sum, t) => sum + t.amount, 0),
    paidAmount: providerTransactions
      .filter((t) => t.payment)
      .reduce((sum, t) => sum + t.amount, 0),
    invoicedAmount: providerTransactions
      .filter((t) => t.type === 'Gasto')
      .reduce((sum, t) => sum + t.amount, 0),
    debt: providerTransactions
      .filter((t) => t.type === 'Gasto' && !t.payment)
      .reduce((sum, t) => sum + t.amount, 0),
    transactions: providerTransactions,
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={onBack}
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <div>
          <h2 className='text-2xl font-bold'>
            {provider.name}
          </h2>
          <p className='text-muted-foreground'>
            {provider.tax_number}
          </p>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                Total
              </p>
              <h3 className='text-2xl font-bold'>
                ${analysis.totalAmount.toLocaleString()}
              </h3>
            </div>
            <DollarSign className='h-8 w-8 text-primary/20' />
          </div>
        </Card>

        <Card className='p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                Pagado
              </p>
              <h3 className='text-2xl font-bold'>
                ${analysis.paidAmount.toLocaleString()}
              </h3>
            </div>
            <TrendingUp className='h-8 w-8 text-green-500/20' />
          </div>
        </Card>

        <Card className='p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                Pendiente
              </p>
              <h3 className='text-2xl font-bold'>
                ${analysis.pendingAmount.toLocaleString()}
              </h3>
            </div>
            <TrendingDown className='h-8 w-8 text-yellow-500/20' />
          </div>
        </Card>

        <Card className='p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                Deuda
              </p>
              <h3 className='text-2xl font-bold'>
                ${analysis.debt.toLocaleString()}
              </h3>
            </div>
            <AlertCircle className='h-8 w-8 text-red-500/20' />
          </div>
        </Card>
      </div>

      <Card className='p-6'>
        <h3 className='text-lg font-semibold mb-4'>
          Estado de pagos
        </h3>
        <div className='space-y-6'>
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>
                Facturado
              </span>
              <span className='font-medium'>
                ${analysis.invoicedAmount.toLocaleString()}
              </span>
            </div>
            <Progress
              value={
                (analysis.invoicedAmount /
                  analysis.totalAmount) *
                100
              }
              className='h-2'
            />
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>
                Pagado
              </span>
              <span className='font-medium'>
                ${analysis.paidAmount.toLocaleString()}
              </span>
            </div>
            <Progress
              value={
                (analysis.paidAmount /
                  analysis.totalAmount) *
                100
              }
              className='h-2'
            />
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>
                Pendiente
              </span>
              <span className='font-medium'>
                ${analysis.pendingAmount.toLocaleString()}
              </span>
            </div>
            <Progress
              value={
                (analysis.pendingAmount /
                  analysis.totalAmount) *
                100
              }
              className='h-2'
            />
          </div>
        </div>
      </Card>

      <Card className='p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-lg font-semibold'>
            Transacciones
          </h3>
          <Button variant='outline' size='sm'>
            <Download className='h-4 w-4 mr-2' />
            Exportar
          </Button>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className='text-right'>
                  Monto
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analysis.transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {format(transaction.date, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    {transaction.description}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        transaction.type === 'Ingreso'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        transaction.payment
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {transaction.payment
                        ? 'Pagado'
                        : 'Pendiente'}
                    </span>
                  </TableCell>
                  <TableCell className='text-right font-medium'>
                    ${transaction.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

export function ProvidersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] =
    useState(false);
  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);
  const [formData, setFormData] =
    useState<ProviderFormData>(initialFormData);
  const [selectedProvider, setSelectedProvider] =
    useState<Provider | null>(null);
  const [providersList, setProvidersList] =
    useState(providers);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const filteredProviders = providersList.filter(
    (provider) => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        provider.name.toLowerCase().includes(searchLower) ||
        provider.email
          .toLowerCase()
          .includes(searchLower) ||
        provider.tax_number
          .toLowerCase()
          .includes(searchLower) ||
        provider.alias.toLowerCase().includes(searchLower)
      );
    }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, country: value }));
  };

  const handleAdd = () => {
    const newProvider: Provider = {
      id: uuidv4(),
      ...formData,
      created_at: new Date(),
      updated_at: new Date(),
    };
    setProvidersList((prev) => [...prev, newProvider]);
    setShowAddDialog(false);
    setFormData(initialFormData);
  };

  const handleEdit = () => {
    if (!selectedProvider) return;

    setProvidersList((prev) =>
      prev.map((provider) =>
        provider.id === selectedProvider.id
          ? {
              ...provider,
              ...formData,
              updated_at: new Date(),
            }
          : provider
      )
    );
    setShowEditDialog(false);
    setSelectedProvider(null);
    setFormData(initialFormData);
  };

  const handleDelete = () => {
    if (!selectedProvider) return;

    setProvidersList((prev) =>
      prev.filter(
        (provider) => provider.id !== selectedProvider.id
      )
    );
    setShowDeleteDialog(false);
    setSelectedProvider(null);
  };

  const openEditDialog = (provider: Provider) => {
    setSelectedProvider(provider);
    setFormData({
      name: provider.name,
      email: provider.email,
      tax_number: provider.tax_number,
      country: provider.country,
      alias: provider.alias,
      cbu: provider.cbu,
    });
    setShowEditDialog(true);
  };

  const openDeleteDialog = (provider: Provider) => {
    setSelectedProvider(provider);
    setShowDeleteDialog(true);
  };

  const handleAnalyze = (provider: Provider) => {
    setSelectedProvider(provider);
    setShowAnalysis(true);
  };

  if (showAnalysis && selectedProvider) {
    return (
      <div className='min-h-screen bg-background'>
        <main className='container mx-auto px-4 py-6'>
          <ProviderAnalysisView
            provider={selectedProvider}
            onBack={() => {
              setShowAnalysis(false);
              setSelectedProvider(null);
            }}
          />
        </main>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto px-4 py-6'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold mb-1'>
              Proveedores
            </h1>
            <p className='text-muted-foreground'>
              Gestiona la información de tus proveedores
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
            <Dialog
              open={showAddDialog}
              onOpenChange={setShowAddDialog}
            >
              <DialogTrigger asChild>
                <Button className='flex-1 sm:flex-none'>
                  <Plus className='mr-2 h-4 w-4' />
                  Agregar proveedor
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Agregar proveedor
                  </DialogTitle>
                  <DialogDescription>
                    Ingresa los datos del nuevo proveedor
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='name'>Nombre</Label>
                    <Input
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='tax_number'>
                        CUIT/RUT/NIT
                      </Label>
                      <Input
                        id='tax_number'
                        name='tax_number'
                        value={formData.tax_number}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label>País</Label>
                      <Select
                        value={formData.country}
                        onValueChange={handleCountryChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Seleccionar país' />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem
                              key={country.code}
                              value={country.code}
                            >
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='alias'>
                      Alias de pago
                    </Label>
                    <Input
                      id='alias'
                      name='alias'
                      value={formData.alias}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='cbu'>
                      CBU/Cuenta bancaria
                    </Label>
                    <Input
                      id='cbu'
                      name='cbu'
                      value={formData.cbu}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant='outline'
                    onClick={() => setShowAddDialog(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleAdd}>
                    Agregar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className='p-4 sm:p-8'>
          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  placeholder='Buscar proveedor...'
                  className='pl-10'
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />
              </div>
            </div>

            <div className='rounded-md border'>
              <div className='overflow-y-auto max-h-[calc(100vh-16rem)]'>
                <div className='overflow-x-auto min-w-full inline-block align-middle'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='min-w-[250px]'>
                          Nombre
                        </TableHead>
                        <TableHead className='min-w-[250px]'>
                          Email
                        </TableHead>
                        <TableHead className='min-w-[150px]'>
                          CUIT/RUT/NIT
                        </TableHead>
                        <TableHead className='min-w-[100px]'>
                          País
                        </TableHead>
                        <TableHead className='min-w-[200px]'>
                          Alias de pago
                        </TableHead>
                        <TableHead className='min-w-[200px]'>
                          CBU/Cuenta
                        </TableHead>
                        <TableHead className='min-w-[150px]'>
                          Acciones
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProviders.map((provider) => (
                        <TableRow key={provider.id}>
                          <TableCell className='min-w-[250px]'>
                            <div className='flex items-center gap-2'>
                              <Building2 className='h-4 w-4 text-muted-foreground' />
                              <span className='font-medium'>
                                {provider.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className='min-w-[250px]'>
                            <div className='flex items-center gap-2'>
                              <Mail className='h-4 w-4 text-muted-foreground' />
                              <span>{provider.email}</span>
                              <CopyButton
                                value={provider.email}
                                tooltip='email'
                              />
                            </div>
                          </TableCell>
                          <TableCell className='min-w-[150px]'>
                            <div className='flex items-center gap-2'>
                              <span>
                                {provider.tax_number}
                              </span>
                              <CopyButton
                                value={provider.tax_number}
                                tooltip='identificación'
                              />
                            </div>
                          </TableCell>
                          <TableCell className='min-w-[100px]'>
                            <div className='flex items-center gap-2'>
                              <Globe2 className='h-4 w-4 text-muted-foreground' />
                              <span>
                                {provider.country}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className='min-w-[200px]'>
                            <div className='flex items-center gap-2'>
                              <span>{provider.alias}</span>
                              <CopyButton
                                value={provider.alias}
                                tooltip='alias'
                              />
                            </div>
                          </TableCell>
                          <TableCell className='min-w-[200px]'>
                            <div className='flex items-center gap-2'>
                              <span className='font-mono'>
                                {provider.cbu.slice(0, 8)}
                                ...{provider.cbu.slice(-4)}
                              </span>
                              <CopyButton
                                value={provider.cbu}
                                tooltip='CBU'
                              />
                            </div>
                          </TableCell>
                          <TableCell className='min-w-[150px]'>
                            <div className='flex items-center gap-2'>
                              <Button
                                variant='ghost'
                                size='icon'
                                onClick={() =>
                                  handleAnalyze(provider)
                                }
                              >
                                <BarChart3 className='h-4 w-4' />
                              </Button>
                              <Button
                                variant='ghost'
                                size='icon'
                                onClick={() =>
                                  openEditDialog(provider)
                                }
                              >
                                <Pencil className='h-4 w-4' />
                              </Button>
                              <Button
                                variant='ghost'
                                size='icon'
                                onClick={() =>
                                  openDeleteDialog(provider)
                                }
                              >
                                <Trash2 className='h-4 w-4' />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Dialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar proveedor</DialogTitle>
              <DialogDescription>
                Modifica los datos del proveedor
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='space-y-2'>
                <Label htmlFor='edit_name'>Nombre</Label>
                <Input
                  id='edit_name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit_email'>Email</Label>
                <Input
                  id='edit_email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='edit_tax_number'>
                    ID Fiscal
                  </Label>
                  <Input
                    id='edit_tax_number'
                    name='tax_number'
                    value={formData.tax_number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label>País</Label>
                  <Select
                    value={formData.country}
                    onValueChange={handleCountryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccionar país' />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem
                          key={country.code}
                          value={country.code}
                        >
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit_alias'>
                  Alias de pago
                </Label>
                <Input
                  id='edit_alias'
                  name='alias'
                  value={formData.alias}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit_cbu'>
                  CBU/Cuenta bancaria
                </Label>
                <Input
                  id='edit_cbu'
                  name='cbu'
                  value={formData.cbu}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => setShowEditDialog(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleEdit}>
                Guardar cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Eliminar proveedor</DialogTitle>
              <DialogDescription>
                ¿Estás seguro que deseas eliminar a{' '}
                {selectedProvider?.name}? Esta acción no se
                puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancelar
              </Button>
              <Button
                variant='destructive'
                onClick={handleDelete}
              >
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
