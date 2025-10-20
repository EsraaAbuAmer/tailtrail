import { Grid, Typography, Skeleton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect, useState } from 'react';
import { fetchPets } from '../../../store/slices/petSlice';
import { PetCard } from '../PetCard/PetCard';
import { gridContainerStyle, loadingStyle, emptyTextStyle } from './PetGrid.styles';

export const PetGrid = () => {
  const dispatch = useAppDispatch();
  const { pets, loading, error } = useAppSelector((state) => state.pets);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      setShowLoading(true);
    } else {
      timer = setTimeout(() => setShowLoading(false), 400);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  if (showLoading)
    return (
      <Grid container spacing={3} sx={gridContainerStyle}>
        {[...Array(6)].map((_, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
            <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 2, mb: 2 }} />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="rounded" height={36} width="100%" sx={{ mt: 1 }} />
          </Grid>
        ))}
      </Grid>
    );

  if (error) return <Typography color="error">{error}</Typography>;
  if (pets.length === 0) return <Typography sx={emptyTextStyle}>No pets found.</Typography>;

  return (
    <Grid container spacing={3} sx={gridContainerStyle}>
      {pets.map((pet) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={pet._id}>
          <PetCard pet={pet} />
        </Grid>
      ))}
    </Grid>
  );
};
