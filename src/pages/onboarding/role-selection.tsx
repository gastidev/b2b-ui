import { Building2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";

export function RoleSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Bienvenido a Gasti</h1>
          <p className="text-muted-foreground">
            ¿Cuál es tu rol en la empresa?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Manager Card */}
          <Card 
            className="p-6 hover:border-primary cursor-pointer transition-colors"
            onClick={() => navigate('/auth/manager')}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Soy Manager</h2>
                <p className="text-muted-foreground mb-4">
                  Gestiono los gastos de mi equipo
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6 text-left">
                  <li>• Configura tu empresa</li>
                  <li>• Invita colaboradores</li>
                  <li>• Gestiona presupuestos</li>
                  <li>• Visualiza reportes</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Employee Card */}
          <Card 
            className="p-6 hover:border-primary cursor-pointer transition-colors"
            onClick={() => navigate('/auth/employee')}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Soy Colaborador</h2>
                <p className="text-muted-foreground mb-4">
                  Gestiono mis gastos en la empresa
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6 text-left">
                  <li>• Carga tus gastos</li>
                  <li>• Gestiona reembolsos</li>
                  <li>• Visualiza tu historial</li>
                  <li>• Recibe notificaciones</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}