import { useState } from 'react';
import { CompanyBasicForm } from '@/components/CompanyBasicForm';

export function CompanyBasicFormExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    name: string;
    identifier: string;
  } | null>(null);

  const handleSubmit = async (data: {
    name: string;
    identifier: string;
  }) => {
    setIsLoading(true);

    // Simulamos una petición a un servidor
    try {
      // En un caso real, aquí iría la llamada a la API
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      // Guardamos el resultado
      setResult(data);

      // Mostramos un mensaje de éxito (en un caso real usaríamos un toast o similar)
      console.log('Datos enviados con éxito:', data);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-6'>
        Información de la Empresa
      </h1>

      <CompanyBasicForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {result && (
        <div className='mt-6 p-4 bg-gray-50 rounded-md'>
          <h2 className='text-lg font-semibold mb-2'>
            Datos recibidos:
          </h2>
          <p>
            <strong>Nombre:</strong> {result.name}
          </p>
          <p>
            <strong>Identificador fiscal:</strong>{' '}
            {result.identifier}
          </p>
        </div>
      )}
    </div>
  );
}
