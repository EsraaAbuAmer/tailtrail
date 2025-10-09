import { useEffect, useMemo, useState } from 'react';
import { PetFilters, SortBy } from '../../../types/filters';
import { useAppSelector } from '../../../store/hooks';

const DEFAULT_FILTERS: PetFilters = {
  search: '',
  type: '',
  status: '',
  country: '',
  city: '',
  distance: 5000, // 5km
  sortBy: '',
};

export const usePetFilters = () => {
  const user = useAppSelector((s) => s.user?.user);
  const [filters, setFilters] = useState<PetFilters>(DEFAULT_FILTERS);

  useEffect(() => {
    if (user && !filters.country && !filters.city) {
      setFilters((prev) => ({
        ...prev,
        country: user.country || '',
        city: user.city || '',
      }));
    }
  }, [user]);

  const setFilter = <K extends keyof PetFilters>(key: K, value: PetFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilter = (key: keyof PetFilters) => {
    setFilters((prev) => ({ ...prev, [key]: DEFAULT_FILTERS[key] }));
  };

  const applyLocation = (country: string, city: string, distance: number) => {
    setFilters((prev) => ({ ...prev, country, city, distance }));
  };

  const locationLabel = useMemo(() => {
    if (!filters.country && !filters.city) return '';
    const km = (filters.distance / 1000).toFixed(0);
    if (filters.city) return `${filters.city} • ${km}km`;
    if (filters.country) return `${filters.country} • ${km}km`;
    return `${km}km`;
  }, [filters.country, filters.city, filters.distance]);

  return {
    filters,
    setFilter,
    clearFilter,
    applyLocation,
    locationLabel,
    setFilters,
  };
};
