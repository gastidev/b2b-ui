import { useState } from 'react';
import { budgetsService } from '../services/budgets.service';

export function useBudgets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const budgets = budgetsService.getBudgets();

  return {
    budgets,
    searchTerm,
    setSearchTerm,
    showAddDialog,
    setShowAddDialog,
  };
}
