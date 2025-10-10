import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { Pet } from '../../types/pet';

interface PetsState {
  pets: Pet[];
  loading: boolean;
  error: string | null;
}

const initialState: PetsState = {
  pets: [],
  loading: false,
  error: null,
};

export const fetchPets = createAsyncThunk('pets/fetchPets', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.get('/pets');
    return data.pets || [];
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to load pets');
  }
});

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {},
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

export default petsSlice.reducer;
