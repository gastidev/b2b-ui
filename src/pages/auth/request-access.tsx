import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Building2 } from 'lucide-react';
import { findUserByEmail } from '@/lib/data/mock-auth';

export function RequestAccessPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Find user by email
    const user = findUserByEmail(email);
    if (!user) {
      setError('No se encontró ningún usuario con ese email');
      return;
    }

    // Store user data in session storage
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="text-muted-foreground">
            Ingresa tu email para acceder a la plataforma
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button type="submit" className="w-full">
            Iniciar sesión
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <Link to="/" className="text-primary hover:underline">
              Regístrate
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}