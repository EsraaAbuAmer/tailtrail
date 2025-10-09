import { Header } from '../../../components/layout/Header/Header';
import { Container, Box, Typography } from '@mui/material';
import { SearchSection } from '../../../components/pets/SearchSection/SearchSection';
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
          {/* 🔜 Pet grid will go here */}
        </Box>
      </Container>
    </>
  );
}
