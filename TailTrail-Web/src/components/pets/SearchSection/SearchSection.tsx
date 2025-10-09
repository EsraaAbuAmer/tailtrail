import { useState } from 'react';
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  searchContainer,
  searchInputWrapper,
  searchIconStyle,
  filtersWrapper,
} from './SearchSection.styles';
import { FilterMenu } from '../FilterMenu/FilterMenu';
import { FilterOpener } from '../FilterButton/FilterOpener';
import LocationFilterModal from '../LocationFilterModal/LocationFilterModal';
import { usePetFilters } from '../../../features/pets/hooks/usePetFilters';

export const SearchSection = () => {
  const { filters, setFilter, clearFilter, applyLocation, locationLabel } = usePetFilters();
  const [locationOpen, setLocationOpen] = useState(false);

  const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Turtle'];
  const statuses = ['Lost', 'Found', 'Solved'];
  const sortOptions = ['Newest', 'Oldest', 'Closest'];

  return (
    <Box sx={searchContainer}>
      {/* Search input */}
      <Box sx={searchInputWrapper}>
        <SearchIcon sx={searchIconStyle} />
        <InputBase
          placeholder="Search by location, pet type (e.g. 'Golden Retriever in Amman')..."
          fullWidth
          sx={{ ml: 5, fontSize: '0.95rem' }}
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
        />
      </Box>

      {/* Filters */}
      <Box sx={filtersWrapper}>
        <FilterMenu
          label="Type"
          options={petTypes}
          value={filters.type}
          onChange={(v) => (v ? setFilter('type', v) : clearFilter('type'))}
        />

        {/* Location opens modal */}
        <FilterOpener
          label="Location"
          value={locationLabel}
          onOpen={() => setLocationOpen(true)}
          onClear={() => {
            clearFilter('country');
            clearFilter('city');
          }}
        />

        <FilterMenu
          label="Status"
          options={statuses}
          value={filters.status}
          onChange={(v) => (v ? setFilter('status', v) : clearFilter('status'))}
        />

        <FilterMenu
          label="Sort By"
          options={sortOptions}
          value={
            filters.sortBy
              ? filters.sortBy === 'newest'
                ? 'Newest'
                : filters.sortBy === 'oldest'
                  ? 'Oldest'
                  : 'Closest'
              : ''
          }
          onChange={(v) => {
            if (!v) return setFilter('sortBy', '');
            const map = {
              Newest: 'newest',
              Oldest: 'oldest',
              Closest: 'closest',
            } as const;
            setFilter('sortBy', map[v as keyof typeof map]);
          }}
        />
      </Box>

      {/* Location Modal */}
      <LocationFilterModal
        open={locationOpen}
        onClose={() => setLocationOpen(false)}
        value={{ country: filters.country, city: filters.city, distance: filters.distance }}
        onApply={({ country, city, distance }) => applyLocation(country, city, distance)}
      />
    </Box>
  );
};
