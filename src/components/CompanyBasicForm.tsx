import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CompanyBasicFormProps {
  onSubmit: (data: {
    name: string;
    identifier: string;
  }) => void;
  isLoading?: boolean;
}

export function CompanyBasicForm({
  onSubmit,
  isLoading = false,
}: CompanyBasicFormProps) {
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, identifier });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Nombre de la empresa</Label>
        <Input
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='identifier'>
          Identificador fiscal
        </Label>
        <Input
          id='identifier'
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
      </div>

      <Button
        type='submit'
        className='w-full'
        disabled={isLoading}
      >
        {isLoading ? 'Procesando...' : 'Enviar'}
      </Button>
    </form>
  );
}
