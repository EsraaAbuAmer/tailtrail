import { Grid, CircularProgress, Typography, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect } from 'react';
import { fetchPets } from '../../../store/slices/petSlice';
import { PetCard } from '../PetCard/PetCard';
import { gridContainerStyle, loadingStyle, emptyTextStyle } from './PetGrid.styles';

export const PetGrid = () => {
  const dispatch = useAppDispatch();
  const { pets, loading, error } = useAppSelector((state) => state.pets);
  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  if (loading)
    return (
      <Box sx={loadingStyle}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Typography color="error">{error}</Typography>;
  if (pets.length === 0) return <Typography sx={emptyTextStyle}>No pets found.</Typography>;

  return (
    <Grid container spacing={3} sx={gridContainerStyle}>
      {pets.map((pet) => (
        <Grid item xs={12} sm={6} md={4} key={pet._id}>
          <PetCard pet={pet} />
        </Grid>
      ))}
    </Grid>
  );
};
