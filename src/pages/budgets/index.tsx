import { useBudgets } from './hooks/useBudgets';
import { BudgetsView } from './components/BudgetsView';

export function BudgetsPage() {
  const {
    budgets,
    searchTerm,
    setSearchTerm,
    showAddDialog,
    setShowAddDialog,
  } = useBudgets();

  return (
    <BudgetsView
      budgets={budgets}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      showAddDialog={showAddDialog}
      setShowAddDialog={setShowAddDialog}
    />
  );
}
