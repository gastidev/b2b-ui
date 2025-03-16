import { format } from "date-fns";
import { Globe, Download, Filter, Search, Menu, Plus, Pencil, Trash2, Check, X, Building2 } from "lucide-react";
import { Transaction } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import { transactions, providers } from "@/lib/data";
import { useState, useEffect } from "react";
import { FilterPanel } from "@/components/filter-panel";
import { FilterGroup, applyFilters, loadFilters, saveFilters } from "@/lib/filters";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TransactionDialog } from "@/components/transaction-dialog";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 360 362" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M307.546 52.5655C273.709 18.685 228.706 0.0171895 180.756 0C81.951 0 1.53846 80.404 1.50408 179.235C1.48689 210.829 9.74646 241.667 25.4319 268.844L0 361.736L95.0236 336.811C121.203 351.096 150.683 358.616 180.679 358.625H180.756C279.544 358.625 359.966 278.212 360 179.381C360.017 131.483 341.392 86.4547 307.546 52.5741V52.5655ZM180.756 328.354H180.696C153.966 328.346 127.744 321.16 104.865 307.589L99.4242 304.358L43.034 319.149L58.0834 264.168L54.5423 258.53C39.6304 234.809 31.749 207.391 31.7662 179.244C31.8006 97.1036 98.6334 30.2707 180.817 30.2707C220.61 30.2879 258.015 45.8015 286.145 73.9665C314.276 102.123 329.755 139.562 329.738 179.364C329.703 261.513 262.871 328.346 180.756 328.346V328.354ZM262.475 216.777C257.997 214.534 235.978 203.704 231.869 202.209C227.761 200.713 224.779 199.966 221.796 204.452C218.814 208.939 210.228 219.029 207.615 222.011C205.002 225.002 202.389 225.372 197.911 223.128C193.434 220.885 179.003 216.158 161.891 200.902C148.578 189.024 139.587 174.362 136.975 169.875C134.362 165.389 136.7 162.965 138.934 160.739C140.945 158.728 143.412 155.505 145.655 152.892C147.899 150.279 148.638 148.406 150.133 145.423C151.629 142.432 150.881 139.82 149.764 137.576C148.646 135.333 139.691 113.287 135.952 104.323C132.316 95.5909 128.621 96.777 125.879 96.6309C123.266 96.5019 120.284 96.4762 117.293 96.4762C114.302 96.4762 109.454 97.5935 105.346 102.08C101.238 106.566 89.6691 117.404 89.6691 139.441C89.6691 161.478 105.716 182.785 107.959 185.776C110.202 188.767 139.544 234.001 184.469 253.408C195.153 258.023 203.498 260.782 210.004 262.845C220.731 266.257 230.494 265.776 238.212 264.624C246.816 263.335 264.71 253.786 268.44 243.326C272.17 232.866 272.17 223.893 271.053 222.028C269.936 220.163 266.945 219.037 262.467 216.794L262.475 216.777Z" 
        fill="currentColor"
      />
    </svg>
  );
}

export function TransactionsPage() {
  const [pageSize, setPageSize] = useState<string>("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactionsList, setTransactionsList] = useState(transactions);
  const [filterGroup, setFilterGroup] = useState<FilterGroup>(() => {
    const saved = loadFilters();
    return saved || {
      operator: 'AND',
      filters: [],
    };
  });

  useEffect(() => {
    saveFilters(filterGroup);
  }, [filterGroup]);

  const filteredTransactions = transactionsList
    .filter(transaction => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        transaction.description.toLowerCase().includes(searchLower) ||
        transaction.category.toLowerCase().includes(searchLower) ||
        transaction.collaborator.toLowerCase().includes(searchLower)
      );
    });

  const finalTransactions = filterGroup.filters.length > 0
    ? applyFilters(filteredTransactions, filterGroup)
    : filteredTransactions;

  const visibleTransactions = finalTransactions.slice(0, parseInt(pageSize));

  const handleTransactionSubmit = (transaction: Transaction) => {
    if (selectedTransaction) {
      setTransactionsList(prev => 
        prev.map(t => t.id === transaction.id ? transaction : t)
      );
    } else {
      setTransactionsList(prev => [...prev, transaction]);
    }
  };

  const handleDelete = () => {
    if (!selectedTransaction) return;
    
    setTransactionsList(prev => 
      prev.filter(t => t.id !== selectedTransaction.id)
    );
    setShowDeleteDialog(false);
    setSelectedTransaction(null);
  };

  const handlePaymentToggle = (transaction: Transaction) => {
    setTransactionsList(prev => 
      prev.map(t => t.id === transaction.id 
        ? { ...t, payment: !t.payment }
        : t
      )
    );
  };

  const openEditDialog = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionDialog(true);
  };

  const openDeleteDialog = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDeleteDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Transacciones</h1>
            <p className="text-muted-foreground">
              Gestiona y visualiza todas las transacciones de tu empresa
            </p>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button 
              className="flex-1 sm:flex-none"
              onClick={() => {
                setSelectedTransaction(null);
                setShowTransactionDialog(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nueva transacción
            </Button>
          </div>
        </div>

        <Card className="p-4 sm:p-8">
          <div className="space-y-4">
            <div className="flex flex-col gap-4 lg:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Buscar transacción..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros {filterGroup.filters.length > 0 && `(${filterGroup.filters.length})`}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:max-w-lg">
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">
                      <FilterPanel
                        transactions={transactions}
                        filterGroup={filterGroup}
                        onFilterChange={setFilterGroup}
                        show={true}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                <Select value={pageSize} onValueChange={setPageSize}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Registros" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 registros</SelectItem>
                    <SelectItem value="25">25 registros</SelectItem>
                    <SelectItem value="50">50 registros</SelectItem>
                    <SelectItem value="100">100 registros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Button 
                variant={showFilters ? "secondary" : "outline"} 
                className="gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filtros {filterGroup.filters.length > 0 && `(${filterGroup.filters.length})`}
              </Button>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Buscar transacción..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Registros por página" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 registros</SelectItem>
                  <SelectItem value="25">25 registros</SelectItem>
                  <SelectItem value="50">50 registros</SelectItem>
                  <SelectItem value="100">100 registros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="hidden lg:block">
              <FilterPanel
                transactions={transactions}
                filterGroup={filterGroup}
                onFilterChange={setFilterGroup}
                show={showFilters}
              />
            </div>
          </div>

          <div className="rounded-md border mt-6">
            <div className="overflow-y-auto max-h-[calc(100vh-16rem)]">
              <div className="overflow-x-auto min-w-full inline-block align-middle">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[250px] sticky left-0 bg-background">Descripción + Origen</TableHead>
                      <TableHead className="min-w-[120px]">Fecha</TableHead>
                      <TableHead className="min-w-[100px]">Tipo</TableHead>
                      <TableHead className="min-w-[150px]">Categoría</TableHead>
                      <TableHead className="min-w-[150px]">Área</TableHead>
                      <TableHead className="min-w-[150px]">Presupuesto</TableHead>
                      <TableHead className="min-w-[80px]">Tag</TableHead>
                      <TableHead className="min-w-[150px] text-right">Monto</TableHead>
                      <TableHead className="min-w-[80px]">Moneda</TableHead>
                      <TableHead className="min-w-[100px]">Reembolsable</TableHead>
                      <TableHead className="min-w-[100px]">Pago</TableHead>
                      <TableHead className="min-w-[200px]">Colaborador</TableHead>
                      <TableHead className="min-w-[200px]">Proveedor</TableHead>
                      <TableHead className="min-w-[100px] sticky right-0 bg-background">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="min-w-[250px] sticky left-0 bg-background">
                          <div className="flex items-center gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="inline-flex">
                                    {transaction.origin === 'whatsapp' ? (
                                      <WhatsAppIcon className="h-4 w-4 text-green-600 shrink-0" />
                                    ) : (
                                      <Globe className="h-4 w-4 text-blue-600 shrink-0" />
                                    )}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {transaction.origin === 'whatsapp' 
                                      ? 'Cargado desde WhatsApp' 
                                      : 'Cargado desde la web'}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <span className="font-medium">{transaction.description}</span>
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[120px]">{format(transaction.date, 'dd/MM/yyyy')}</TableCell>
                        <TableCell className="min-w-[100px]">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            transaction.type === 'Ingreso' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.type}
                          </span>
                        </TableCell>
                        <TableCell className="min-w-[150px]">{transaction.category}</TableCell>
                        <TableCell className="min-w-[150px]">{transaction.area}</TableCell>
                        <TableCell className="min-w-[150px]">{transaction.budget}</TableCell>
                        <TableCell className="min-w-[80px]">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            {transaction.tag}
                          </span>
                        </TableCell>
                        <TableCell className="min-w-[150px] text-right font-medium">
                          ${transaction.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="min-w-[80px]">{transaction.currency}</TableCell>
                        <TableCell className="min-w-[100px]">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            transaction.is_reimbursable 
                              ? transaction.payment
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {transaction.is_reimbursable 
                              ? transaction.payment
                                ? 'Pagado'
                                : 'Pendiente'
                              : 'No'}
                          </span>
                        </TableCell>
                        <TableCell className="min-w-[100px]">
                          {transaction.is_reimbursable && (
                            <div className="flex items-center justify-center">
                              {transaction.payment ? (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePaymentToggle(transaction);
                                  }}
                                >
                                  <Check className="h-4 w-4 text-green-500" />
                                </Button>
                              ) : (
                                <div className="relative">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handlePaymentToggle(transaction);
                                    }}
                                  >
                                    <X className="h-4 w-4 text-muted-foreground group-hover:hidden" />
                                    <Check className="h-4 w-4 text-muted-foreground hover:text-green-500 absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="min-w-[200px]">{transaction.collaborator}</TableCell>
                        <TableCell className="min-w-[200px]">
                          {transaction.provider_id && (
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span>{providers.find(p => p.id === transaction.provider_id)?.name}</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="min-w-[100px] sticky right-0 bg-background">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(transaction)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDeleteDialog(transaction)}
                            >
                              <Trash2 className="h-4 w-4" />
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
        </Card>

        {/* Transaction Dialog */}
        <TransactionDialog
          open={showTransactionDialog}
          onOpenChange={setShowTransactionDialog}
          transaction={selectedTransaction || undefined}
          onSubmit={handleTransactionSubmit}
        />

        {/* Delete Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Eliminar transacción</AlertDialogTitle>
              <AlertDialogDescription>
                ¿Estás seguro que deseas eliminar esta transacción?
                Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}