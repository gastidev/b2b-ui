import { Budget } from '../domain/types';
import { budgets as mockBudgets } from '@/lib/data';

class BudgetsService {
  getBudgets(): Budget[] {
    // Por ahora usamos datos mock, pero aquí se conectaría con la API
    return mockBudgets;
  }

  async createBudget(
    budget: Omit<Budget, 'id'>
  ): Promise<Budget> {
    // Aquí iría la lógica para crear un presupuesto en el backend
    throw new Error('Not implemented');
  }

  async updateBudget(
    id: string,
    budget: Partial<Budget>
  ): Promise<Budget> {
    // Aquí iría la lógica para actualizar un presupuesto en el backend
    throw new Error('Not implemented');
  }

  async deleteBudget(id: string): Promise<void> {
    // Aquí iría la lógica para eliminar un presupuesto en el backend
    throw new Error('Not implemented');
  }
}

export const budgetsService = new BudgetsService();
