import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Transaction } from '@/lib/data';
import {
  Filter,
  FilterGroup,
  FilterOperator,
  FilterType,
  columnMeta,
  conditionsByType,
  getUniqueValues,
} from '@/lib/filters';

interface FilterDialogProps {
  transactions: Transaction[];
  filterGroup: FilterGroup;
  onFilterChange: (filterGroup: FilterGroup) => void;
  children: React.ReactNode;
}

export function FilterDialog({ 
  transactions, 
  filterGroup, 
  onFilterChange,
  children 
}: FilterDialogProps) {
  const [open, setOpen] = useState(false);

  const handleOperatorChange = (value: FilterOperator) => {
    onFilterChange({ ...filterGroup, operator: value });
  };

  const addFilter = () => {
    const newFilter: Filter = {
      id: uuidv4(),
      field: 'description',
      type: 'string',
      condition: 'contains',
      value: '',
    };
    onFilterChange({
      ...filterGroup,
      filters: [...filterGroup.filters, newFilter],
    });
  };

  const removeFilter = (id: string) => {
    onFilterChange({
      ...filterGroup,
      filters: filterGroup.filters.filter(f => f.id !== id),
    });
  };

  const updateFilter = (id: string, updates: Partial<Filter>) => {
    onFilterChange({
      ...filterGroup,
      filters: filterGroup.filters.map(filter =>
        filter.id === id ? { ...filter, ...updates } : filter
      ),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Filtros avanzados</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Operator selection */}
          <div className="space-y-2">
            <Label>Operador entre filtros</Label>
            <RadioGroup
              value={filterGroup.operator}
              onValueChange={handleOperatorChange}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="AND" id="and" />
                <Label htmlFor="and">AND (Todos los filtros)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="OR" id="or" />
                <Label htmlFor="or">OR (Algún filtro)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            {filterGroup.filters.map((filter) => (
              <div key={filter.id} className="flex gap-4 items-start">
                {/* Field selection */}
                <Select
                  value={filter.field}
                  onValueChange={(value) => {
                    const type = columnMeta[value].type;
                    const condition = conditionsByType[type][0].value;
                    updateFilter(filter.id, {
                      field: value as keyof Transaction,
                      type,
                      condition,
                      value: '',
                      value2: undefined,
                    });
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar campo" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(columnMeta).map(([field, meta]) => (
                      <SelectItem key={field} value={field}>
                        {meta.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Condition selection */}
                <Select
                  value={filter.condition}
                  onValueChange={(value) => {
                    updateFilter(filter.id, {
                      condition: value as any,
                      value: '',
                      value2: undefined,
                    });
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar condición" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditionsByType[filter.type].map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Value input */}
                <div className="flex-1 flex gap-2">
                  {filter.type === 'select' ? (
                    <Select
                      value={filter.value}
                      onValueChange={(value) => updateFilter(filter.id, { value })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar valor" />
                      </SelectTrigger>
                      <SelectContent>
                        {getUniqueValues(transactions, filter.field).map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : filter.type === 'date' ? (
                    <>
                      <Input
                        type="date"
                        value={filter.value ? new Date(filter.value).toISOString().split('T')[0] : ''}
                        onChange={(e) => updateFilter(filter.id, { value: new Date(e.target.value) })}
                      />
                      {filter.condition === 'between' && (
                        <Input
                          type="date"
                          value={filter.value2 ? new Date(filter.value2).toISOString().split('T')[0] : ''}
                          onChange={(e) => updateFilter(filter.id, { value2: new Date(e.target.value) })}
                        />
                      )}
                    </>
                  ) : filter.type === 'number' ? (
                    <>
                      <Input
                        type="number"
                        value={filter.value}
                        onChange={(e) => updateFilter(filter.id, { value: parseFloat(e.target.value) })}
                      />
                      {filter.condition === 'between' && (
                        <Input
                          type="number"
                          value={filter.value2}
                          onChange={(e) => updateFilter(filter.id, { value2: parseFloat(e.target.value) })}
                        />
                      )}
                    </>
                  ) : (
                    <Input
                      value={filter.value}
                      onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
                    />
                  )}
                </div>

                {/* Remove filter button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFilter(filter.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Add filter button */}
          <Button variant="outline" onClick={addFilter} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Agregar filtro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}