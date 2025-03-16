import { useState } from 'react';
import { accounts as mockAccounts } from '@/lib/data';
import { accountsService } from '../services/accounts.service';

export function useAccounts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const accounts = accountsService.getAccounts();

  return {
    accounts,
    searchTerm,
    setSearchTerm,
    showAddDialog,
    setShowAddDialog,
  };
}
