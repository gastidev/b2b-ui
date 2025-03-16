import { useEffect, useMemo, useState } from 'react';

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type DeepKeys<T, D extends number = 10> = [D] extends [
  never
]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, DeepKeys<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : '';

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  ...0[]
];

interface SearchOptions {
  minSearchLength: number;
  matchMode: 'any' | 'all';
}

const defaultOptions = {
  minSearchLength: 2,
  matchMode: 'any',
} as const;

const getNestedValue = (
  obj: unknown,
  path: string
): unknown => {
  return path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
};

export function useSearch<T extends object>(
  initialData: T[],
  searchKeys: Array<DeepKeys<T>>,
  options?: Partial<SearchOptions>
) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] =
    useState<T[]>(initialData);

  // Merge options with defaults, ensuring all properties have values
  const finalOptions = useMemo(() => {
    return {
      ...defaultOptions,
      ...options,
    };
  }, [options]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    if (searchTerm.length < finalOptions.minSearchLength) {
      setFilteredData(initialData);
      return;
    }

    const searchLower = searchTerm.toLowerCase();

    const filtered = initialData.filter((item) => {
      const matches = searchKeys.map((key) => {
        const value = getNestedValue(item, key);
        if (value == null) return false;

        const stringValue =
          typeof value === 'string' ? value : String(value);
        return stringValue
          .toLowerCase()
          .includes(searchLower);
      });

      return finalOptions.matchMode === 'any'
        ? matches.some((match) => match)
        : matches.every((match) => match);
    });

    setFilteredData(filtered);
  }, [searchTerm, initialData, searchKeys, finalOptions]);

  return {
    term: searchTerm,
    handleSearch,
    data: filteredData,
    isSearching:
      searchTerm.length >= finalOptions.minSearchLength,
  };
}
