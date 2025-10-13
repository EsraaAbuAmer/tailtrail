import { Header } from '../../../components/layout/Header/Header';
import { Container, Box, Typography } from '@mui/material';
import { SearchSection } from '../../../components/pets/SearchSection/SearchSection';
import { PetGrid } from '../../../components/pets/PetGrid/PetGrid';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setFilters } from '../../../store/slices/petSlice';
import { useEffect } from 'react';

export default function HomePage() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.country && user?.city) {
      dispatch(setFilters({ country: user.country, city: user.city }));
    }
  }, [user, dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <SearchSection onSearchChange={(value) => console.log('search:', value)} />

        <Box>
          <Typography variant="h5" fontWeight={700} mb={2}>
            Recently Reported Pets
          </Typography>
          <Box>
            <PetGrid />
          </Box>
        </Box>
      </Container>
    </>
  );
}
