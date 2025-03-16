import { useState } from 'react';
import { FilterGroup } from '../domain/types';
import { transactionsService } from '../services/transactions.service';

export function useTransactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] =
    useState<FilterGroup>({ filters: [] });
  const [showFilters, setShowFilters] = useState(false);
  const [pageSize, setPageSize] = useState<string>('10');

  const transactions =
    transactionsService.getTransactions();

  return {
    transactions,
    searchTerm,
    setSearchTerm,
    filterGroup,
    setFilterGroup,
    showFilters,
    setShowFilters,
    pageSize,
    setPageSize,
  };
}
