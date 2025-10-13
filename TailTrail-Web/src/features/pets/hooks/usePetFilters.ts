import { useEffect, useMemo, useState } from 'react';
import { PetFilters } from '../../../types/filters';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { fetchPets, setFilters as setReduxFilters } from '../../../store/slices/petSlice';

const DEFAULT_FILTERS: PetFilters = {
  search: '',
  type: '',
  status: '',
  country: '',
  city: '',
  distance: 5000, // 5km
  sortBy: '',
  lat: undefined,
  lng: undefined,
};

export const usePetFilters = () => {
  const user = useAppSelector((s) => s.user?.user);
  const dispatch = useAppDispatch();
  const reduxFilters = useAppSelector((s) => s.pets.filters);
  const [geoTried, setGeoTried] = useState(false);

  const [filters, setFilters] = useState<PetFilters>({
    ...DEFAULT_FILTERS,
    ...reduxFilters,
  });

  useEffect(() => {
    if (user && !filters.country && !filters.city) {
      setFilters((prev) => ({
        ...prev,
        country: user.country || '',
        city: user.city || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    if (geoTried || filters.lat || filters.lng) return;

    if (!('geolocation' in navigator)) {
      console.warn('⚠️ Geolocation not supported by this browser');
      setGeoTried(true);
      return;
    }

    const success = (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;
      console.log('📍 Real location detected:', latitude, longitude);
      setFilters((prev) => ({ ...prev, lat: latitude, lng: longitude }));
      setGeoTried(true);
    };

    const error = (err: GeolocationPositionError) => {
      console.warn('⚠️ Geolocation error:', err.message);
      if (!filters.lat && !filters.lng) {
        setFilters((prev) => ({
          ...prev,
          lat: undefined,
          lng: undefined,
        }));
      }
      setGeoTried(true);
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  }, [geoTried, filters.lat, filters.lng]);

  useEffect(() => {
    const useNearby = Boolean(filters.lat && filters.lng && filters.distance);
    dispatch(setReduxFilters(filters));
    dispatch(fetchPets({ ...filters, useNearby }));
  }, [filters, dispatch]);

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
