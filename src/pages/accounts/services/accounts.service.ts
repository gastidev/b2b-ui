import { Account } from '../domain/types';
import { accounts as mockAccounts } from '@/lib/data';

class AccountsService {
  getAccounts(): Account[] {
    // Por ahora usamos datos mock, pero aquí se conectaría con la API
    return mockAccounts;
  }

  async createAccount(
    account: Omit<Account, 'id'>
  ): Promise<Account> {
    // Aquí iría la lógica para crear una cuenta en el backend
    throw new Error('Not implemented');
  }

  async updateAccount(
    id: string,
    account: Partial<Account>
  ): Promise<Account> {
    // Aquí iría la lógica para actualizar una cuenta en el backend
    throw new Error('Not implemented');
  }

  async deleteAccount(id: string): Promise<void> {
    // Aquí iría la lógica para eliminar una cuenta en el backend
    throw new Error('Not implemented');
  }
}

export const accountsService = new AccountsService();
