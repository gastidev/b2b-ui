import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findUserByEmail } from '@/lib/data/mock-auth';
import { Users, LogIn, UserPlus } from 'lucide-react';

export function EmployeeAuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showRequestAccess, setShowRequestAccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = findUserByEmail(email);
    if (!user) {
      setError('Usuario no encontrado');
      return;
    }

    if (user.role !== 'employee') {
      setError('Este usuario no es un colaborador');
      return;
    }

    // Store user data in session storage
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    navigate('/dashboard');
  };

  const handleRequestAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Store the manager's email for the employee registration process
    sessionStorage.setItem('invitedEmail', managerEmail);
    navigate('/onboarding/employee');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Colaborador</h1>
            <p className="text-muted-foreground">
              {showLogin ? 'Inicia sesión en tu cuenta' : 
               showRequestAccess ? 'Solicita acceso a tu empresa' : 
               '¿Qué deseas hacer?'}
            </p>
          </div>
        </div>

        {showLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Button type="submit">
                Iniciar sesión
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowLogin(false)}>
                Volver
              </Button>
            </div>
          </form>
        ) : showRequestAccess ? (
          <form onSubmit={handleRequestAccess} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="manager-email">Email del manager</Label>
              <Input
                id="manager-email"
                type="email"
                value={managerEmail}
                onChange={(e) => setManagerEmail(e.target.value)}
                placeholder="manager@empresa.com"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button type="submit">
                Solicitar acceso
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowRequestAccess(false)}>
                Volver
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <Button onClick={() => setShowRequestAccess(true)} className="gap-2">
              <UserPlus className="h-4 w-4" />
              Solicitar acceso
            </Button>
            <Button variant="outline" onClick={() => setShowLogin(true)} className="gap-2">
              <LogIn className="h-4 w-4" />
              Iniciar sesión
            </Button>
            <Button variant="ghost" onClick={() => navigate('/')} className="mt-2">
              Volver al inicio
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}