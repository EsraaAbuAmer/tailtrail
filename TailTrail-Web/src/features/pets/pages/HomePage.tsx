import { Header } from '../../../components/layout/Header/Header';
import { Container, Box, Typography } from '@mui/material';
import { SearchSection } from '../../../components/pets/SearchSection/SearchSection';
import { PetGrid } from '../../../components/pets/PetGrid/PetGrid';
export default function HomePage() {
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
