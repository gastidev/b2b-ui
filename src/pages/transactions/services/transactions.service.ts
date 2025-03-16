import { Transaction } from '../domain/types';
import { transactions as mockTransactions } from '@/lib/data';

class TransactionsService {
  getTransactions(): Transaction[] {
    // Por ahora usamos datos mock, pero aquí se conectaría con la API
    return mockTransactions;
  }

  async createTransaction(
    transaction: Omit<Transaction, 'id'>
  ): Promise<Transaction> {
    // Aquí iría la lógica para crear una transacción en el backend
    throw new Error('Not implemented');
  }

  async updateTransaction(
    id: string,
    transaction: Partial<Transaction>
  ): Promise<Transaction> {
    // Aquí iría la lógica para actualizar una transacción en el backend
    throw new Error('Not implemented');
  }

  async deleteTransaction(id: string): Promise<void> {
    // Aquí iría la lógica para eliminar una transacción en el backend
    throw new Error('Not implemented');
  }
}

export const transactionsService =
  new TransactionsService();
