import { gastiClient } from '@/lib/api';
import { Transaction } from '../domain/types';

export const transactionsService = {
  async getTransactions(): Promise<Transaction[]> {
    const { data } = await gastiClient.get<{
      data: Transaction[];
    }>('/transactions');
    return data.data;
  },

  async createTransaction(
    transaction: Omit<Transaction, 'id'>
  ): Promise<Transaction> {
    const { data } = await gastiClient.post<{
      data: Transaction;
    }>('/transactions', transaction);
    return data.data;
  },

  async updateTransaction(
    id: string,
    transaction: Partial<Transaction>
  ): Promise<Transaction> {
    const { data } = await gastiClient.patch<{
      data: Transaction;
    }>(`/transactions/${id}`, transaction);
    return data.data;
  },

  async deleteTransaction(id: string): Promise<void> {
    await gastiClient.delete(`/transactions/${id}`);
  },
};
