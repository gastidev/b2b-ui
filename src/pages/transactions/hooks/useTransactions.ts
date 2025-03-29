import { useState } from 'react';
import { FilterGroup, Transaction } from '../domain/types';

export function useTransactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] =
    useState<FilterGroup>({ filters: [] });
  const [showFilters, setShowFilters] = useState(false);
  const [pageSize, setPageSize] = useState<string>('10');

  const transactions: Transaction[] = [];

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
