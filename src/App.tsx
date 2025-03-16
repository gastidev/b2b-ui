import {
  DollarSign,
  Download,
  PlusCircle,
  Settings,
  Wallet,
  PieChart,
  CreditCard,
  Building2,
  Users,
  BarChart,
  ChevronDown,
  TrendingDown,
  TrendingUp,
  Menu,
  LogOut,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/stats-card';
import { ExpenseChart } from '@/components/expense-chart';
import { ExpenseCharts } from '@/components/expense-charts';
import { TransactionsTable } from '@/components/transactions-table';
import { transactions, stats } from '@/lib/data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import { TransactionsPage } from '@/pages/transactions';
import { EmployeesPage } from '@/pages/employees';
import { BudgetsPage } from '@/pages/budgets';
import { AccountsPage } from '@/pages/accounts';
import { DepartmentsPage } from '@/pages/departments';
import { CategoriesPage } from '@/pages/categories';
import { SettingsPage } from '@/pages/settings';
import { RoleSelectionPage } from '@/pages/onboarding/role-selection';
import { UserDetailsPage } from '@/pages/onboarding/user-details';
import { CompanyDetailsPage } from '@/pages/onboarding/company-details';
import { InvitePage } from '@/pages/onboarding/invite';
import { EmployeeDetailsPage } from '@/pages/onboarding/employee-details';
import { RequestAccessPage } from '@/pages/auth/request-access';
import { PendingApprovalPage } from '@/pages/auth/pending-approval';
import { ManagerAuthPage } from '@/pages/auth/manager/manager-auth';
import { EmployeeAuthPage } from '@/pages/auth/employee-auth';
import { useState } from 'react';
import { EmployeeDataCheck } from '@/components/employee-data-check';
import { ProvidersPage } from '@/pages/providers';
import {
  useRequireAuth,
  useRequireNoAuth,
} from './lib/auth';
import { AcceptInvitationPage } from '@/pages/auth/invitation/accept';
import { RejectedInvitationPage } from '@/pages/auth/invitation/rejected';
import { useSignOut } from '@/pages/auth/hooks/useSignOut';
import { Toaster } from '@/components/ui/toaster';

function Navigation() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='text-sm font-medium gap-2 px-2'
          >
            <Wallet className='h-4 w-4' />
            Finanzas
            <ChevronDown className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link
              to='/transactions'
              className='flex items-center'
            >
              <PieChart className='h-4 w-4 mr-2' />
              Transacciones
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to='/budgets'
              className='flex items-center'
            >
              <DollarSign className='h-4 w-4 mr-2' />
              Presupuestos
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to='/accounts'
              className='flex items-center'
            >
              <CreditCard className='h-4 w-4 mr-2' />
              Cuentas
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='text-sm font-medium gap-2 px-2'
          >
            <Building2 className='h-4 w-4' />
            Gestión
            <ChevronDown className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link
              to='/departments'
              className='flex items-center'
            >
              <Building2 className='h-4 w-4 mr-2' />
              Áreas
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to='/employees'
              className='flex items-center'
            >
              <Users className='h-4 w-4 mr-2' />
              Colaboradores
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to='/providers'
              className='flex items-center'
            >
              <Building2 className='h-4 w-4 mr-2' />
              Proveedores
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to='/categories'
              className='flex items-center'
            >
              <PieChart className='h-4 w-4 mr-2' />
              Categorías
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='text-sm font-medium gap-2 px-2'
          >
            <BarChart className='h-4 w-4' />
            Análisis
            <ChevronDown className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className='flex items-center'>
            <PieChart className='h-4 w-4 mr-2' />
            Gráficos
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-background'>
      <header className='border-b'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4'>
          <div className='flex items-center gap-2'>
            <span className='text-lg font-semibold'>
              Gasti 💸
            </span>
          </div>
          <Button
            onClick={() => navigate('/auth')}
            className='gap-2'
          >
            Comenzar ahora
            <ArrowRight className='h-4 w-4' />
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className='py-20 px-4'>
          <div className='container mx-auto text-center'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-6'>
              Gestiona tus gastos empresariales
              <span className='text-primary block mt-2'>
                de manera inteligente
              </span>
            </h1>
            <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
              Simplifica la gestión de gastos, presupuestos
              y reembolsos de tu empresa con una plataforma
              intuitiva y poderosa.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                size='lg'
                onClick={() => navigate('/auth')}
                className='gap-2'
              >
                Comenzar gratis
                <ArrowRight className='h-4 w-4' />
              </Button>
              <Button size='lg' variant='outline'>
                Ver demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='py-20 bg-muted/50'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              Todo lo que necesitas para gestionar tus
              finanzas
            </h2>
            <div className='grid md:grid-cols-3 gap-8'>
              <div className='bg-background p-6 rounded-lg'>
                <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
                  <PieChart className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>
                  Control de gastos
                </h3>
                <p className='text-muted-foreground'>
                  Registra y monitorea todos los gastos de
                  tu empresa en tiempo real.
                </p>
              </div>
              <div className='bg-background p-6 rounded-lg'>
                <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
                  <Users className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>
                  Gestión de equipos
                </h3>
                <p className='text-muted-foreground'>
                  Administra permisos y roles para cada
                  miembro de tu equipo.
                </p>
              </div>
              <div className='bg-background p-6 rounded-lg'>
                <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
                  <BarChart className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>
                  Reportes detallados
                </h3>
                <p className='text-muted-foreground'>
                  Obtén insights valiosos con reportes y
                  análisis avanzados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-20'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl font-bold mb-4'>
              ¿Listo para empezar?
            </h2>
            <p className='text-xl text-muted-foreground mb-8'>
              Únete a miles de empresas que ya confían en
              Gasti
            </p>
            <Button
              size='lg'
              onClick={() => navigate('/auth')}
              className='gap-2'
            >
              Crear cuenta gratis
              <ArrowRight className='h-4 w-4' />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

function HomePage() {
  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto px-4 py-6'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold mb-1'>
              ¡Bienvenido!
            </h1>
            <p className='text-muted-foreground'>
              Gestioná todas tus finanzas desde un solo
              lugar.
            </p>
          </div>
          <div className='flex gap-2 sm:gap-4 w-full sm:w-auto'>
            <Button
              variant='outline'
              className='flex-1 sm:flex-none'
            >
              <Download className='mr-2 h-4 w-4' />
              Importar
            </Button>
            <Button className='flex-1 sm:flex-none'>
              <PlusCircle className='mr-2 h-4 w-4' />
              Agregar gasto
            </Button>
          </div>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8'>
          <StatsCard
            title='Monto actual'
            value={`$${stats.currentAmount.toLocaleString()}`}
            change={stats.currentAmountChange}
            icon={
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            }
          />
          <StatsCard
            title='Total gastado'
            value={`$${stats.totalSpent.toLocaleString()}`}
            change={stats.totalSpentChange}
            icon={
              <TrendingDown className='h-4 w-4 text-red-500' />
            }
          />
          <StatsCard
            title='Ingresos totales'
            value={`$${stats.totalIncome.toLocaleString()}`}
            change={stats.totalIncomeChange}
            icon={
              <TrendingUp className='h-4 w-4 text-green-500' />
            }
          />
        </div>

        <Tabs defaultValue='overview' className='mb-8'>
          <TabsList>
            <TabsTrigger value='overview'>
              Vista general
            </TabsTrigger>
            <TabsTrigger value='finances'>
              Finanzas
            </TabsTrigger>
            <TabsTrigger value='management'>
              Gestión
            </TabsTrigger>
          </TabsList>
          <TabsContent value='overview'>
            <div className='grid gap-4 lg:grid-cols-[1fr,300px]'>
              <TransactionsTable
                transactions={transactions}
              />
              <ExpenseChart />
            </div>
          </TabsContent>
          <TabsContent value='finances'>
            <div className='grid gap-4'>
              <TransactionsTable
                transactions={transactions}
              />
              <ExpenseCharts />
            </div>
          </TabsContent>
          <TabsContent value='management'>
            <div className='grid gap-4'>
              <ExpenseCharts />
              <TransactionsTable
                transactions={transactions}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [showDataCheck, setShowDataCheck] = useState(false);
  // const { data: session } = useSession();
  const { signOut, isLoading: isSigningOut } = useSignOut();

  // useEffect(() => {
  //   if (session?.user.role === 'employee') {
  //     setShowDataCheck(true);
  //   }
  // }, [session]);

  return (
    <>
      <header className='border-b'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4'>
          <div className='flex items-center gap-2'>
            <Link
              to='/dashboard'
              className='flex items-center gap-2'
            >
              <span className='text-lg font-semibold'>
                Gasti 💸
              </span>
            </Link>
            <span className='text-muted-foreground'>|</span>
            <nav className='hidden lg:flex items-center gap-1'>
              <Navigation />
            </nav>
          </div>
          <div className='flex items-center gap-4'>
            <Button
              variant='ghost'
              size='icon'
              className='lg:hidden'
              onClick={() => setOpen(true)}
            >
              <Menu className='h-5 w-5' />
            </Button>
            <Link to='/settings'>
              <Button variant='ghost' size='icon'>
                <Settings className='h-5 w-5' />
              </Button>
            </Link>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => signOut()}
              disabled={isSigningOut}
            >
              {isSigningOut ? (
                <div className='h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent' />
              ) : (
                <LogOut className='h-5 w-5' />
              )}
            </Button>
          </div>
        </div>
      </header>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side='left'
          className='w-[300px] sm:w-[400px]'
        >
          <nav className='flex flex-col gap-4 mt-8'>
            <Navigation />
          </nav>
        </SheetContent>
      </Sheet>

      {showDataCheck && (
        <EmployeeDataCheck
          onComplete={() => setShowDataCheck(false)}
        />
      )}

      {children}
      <Toaster />
    </>
  );
}

function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useRequireAuth();
  return session ? <>{children}</> : null;
}

function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  useRequireNoAuth();
  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path='/'
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />
      <Route
        path='/auth'
        element={
          <PublicRoute>
            <RoleSelectionPage />
          </PublicRoute>
        }
      />
      <Route
        path='/auth/manager'
        element={
          <PublicRoute>
            <ManagerAuthPage />
          </PublicRoute>
        }
      />
      <Route
        path='/auth/employee'
        element={
          <PublicRoute>
            <EmployeeAuthPage />
          </PublicRoute>
        }
      />
      <Route
        path='/onboarding/user'
        element={
          <PublicRoute>
            <UserDetailsPage />
          </PublicRoute>
        }
      />
      <Route
        path='/onboarding/company'
        element={
          <PublicRoute>
            <CompanyDetailsPage />
          </PublicRoute>
        }
      />
      <Route
        path='/onboarding/invite'
        element={
          <PublicRoute>
            <InvitePage />
          </PublicRoute>
        }
      />
      <Route
        path='/onboarding/employee'
        element={
          <PublicRoute>
            <EmployeeDetailsPage />
          </PublicRoute>
        }
      />
      <Route
        path='/auth/request-access'
        element={
          <PublicRoute>
            <RequestAccessPage />
          </PublicRoute>
        }
      />
      <Route
        path='/auth/pending-approval'
        element={
          <PublicRoute>
            <PendingApprovalPage />
          </PublicRoute>
        }
      />
      <Route
        path='/invitation/accept'
        element={
          <PublicRoute>
            <AcceptInvitationPage />
          </PublicRoute>
        }
      />
      <Route
        path='/invitation/rejected'
        element={
          <PublicRoute>
            <RejectedInvitationPage />
          </PublicRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path='/dashboard'
        element={
          <RequireAuth>
            <MainLayout>
              <HomePage />
            </MainLayout>
          </RequireAuth>
        }
      />
      <Route
        path='/transactions'
        element={
          <RequireAuth>
            <MainLayout>
              <TransactionsPage />
            </MainLayout>
          </RequireAuth>
        }
      />
      <Route
        path='/employees'
        element={
          <RequireAuth>
            <MainLayout>
              <EmployeesPage />
            </MainLayout>
          </RequireAuth>
        }
      />
      <Route
        path='/budgets'
        element={
          <RequireAuth>
            <MainLayout>
              <BudgetsPage />
            </MainLayout>
          </RequireAuth>
        }
      />
      <Route
        path='/accounts'
        element={
          <RequireAuth>
            <MainLayout>
              <AccountsPage />
            </MainLayout>
          </RequireAuth>
        }
      />
      <Route
        path='/departments'
        element={
          <RequireAuth>
            <MainLayout>
              <DepartmentsPage />
            </MainLayout>
          </RequireAuth>
        }
      />
      <Route
        path='/providers'
        element={
          <RequireAuth>
            <MainLayout>
              <ProvidersPage />
            </MainLayout>
          </RequireAuth>
        }
      />
      <Route
        path='/categories'
        element={
          <RequireAuth>
            <MainLayout>
              <CategoriesPage />
            </MainLayout>
          </RequireAuth>
        }
      />
      <Route
        path='/settings'
        element={
          <RequireAuth>
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
