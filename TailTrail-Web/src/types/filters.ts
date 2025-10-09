export type SortBy = 'newest' | 'oldest' | 'closest';

export interface PetFilters {
  search: string;
  type: string;
  status: string;
  country: string;
  city: string;
  distance: number; // meters
  sortBy: SortBy;
}