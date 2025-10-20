import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { Pet } from '../../types/pet';

interface PetsState {
  pets: Pet[];
  loading: boolean;
  error: string | null;
}

interface FilterParams {
  type?: string;
  status?: string;
  country?: string;
  city?: string;
  distance?: number;
  lat?: number;
  lng?: number;
  sortBy?: string;
  useNearby?: boolean;
}

const initialState: PetsState = {
  pets: [],
  loading: false,
  error: null,
};

export const fetchPets = createAsyncThunk(
  'pets/fetchPets',
  async (filters: FilterParams = {}, { rejectWithValue }) => {
    try {
      const { useNearby, ...rest } = filters;

      const query = Object.fromEntries(
        Object.entries(rest)
          .filter(([_, value]) => value !== '' && value !== undefined && value !== null)
          .map(([key, value]) => {
            if (key.toLowerCase() === 'country') {
              return [key, value];
            }
            return [key.toLowerCase(), typeof value === 'string' ? value.toLowerCase() : value];
          }),
      );
      const url = useNearby ? '/pets/near' : '/pets';
      const { data } = await axiosClient.get(url, { params: query });

      console.log('✅ Pets fetched:', data);
      return data.pets || [];
    } catch (err: any) {
      console.error('❌ fetchPets error:', err);
      return rejectWithValue(err.response?.data?.message || 'Failed to load pets');
    }
  },
);

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearFilters } = petsSlice.actions;
export default petsSlice.reducer;
