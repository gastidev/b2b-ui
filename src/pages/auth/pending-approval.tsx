import { Building2 } from 'lucide-react';
import { Card } from "@/components/ui/card";

export function PendingApprovalPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
            <Building2 className="h-6 w-6 text-warning" />
          </div>
          <h1 className="text-2xl font-bold">Empresa pendiente de aprobación</h1>
          <p className="text-muted-foreground">
            Tu empresa está siendo revisada por nuestro equipo. Te notificaremos por email cuando la revisión esté completa.
          </p>
          <div className="w-full max-w-xs bg-muted/50 rounded-lg p-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Tiempo estimado de revisión: 24-48 horas hábiles
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}