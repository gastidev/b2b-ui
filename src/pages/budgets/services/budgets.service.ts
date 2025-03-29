import { gastiClient } from '@/lib/api';
import { Budget } from '../domain/types';

export const budgetsService = {
  async getBudgets(): Promise<Budget[]> {
    const { data } = await gastiClient.get<{
      data: Budget[];
    }>('/budgets');
    return data.data;
  },

  async createBudget(
    budget: Omit<Budget, 'id'>
  ): Promise<Budget> {
    const { data } = await gastiClient.post<{
      data: Budget;
    }>('/budgets', budget);
    return data.data;
  },

  async updateBudget(
    id: string,
    budget: Partial<Budget>
  ): Promise<Budget> {
    const { data } = await gastiClient.patch<{
      data: Budget;
    }>(`/budgets/${id}`, budget);
    return data.data;
  },

  async deleteBudget(id: string): Promise<void> {
    await gastiClient.delete(`/budgets/${id}`);
  },
};
