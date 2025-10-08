import { Header } from '../../../components/layout/Header/Header';
import { Container, Box, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* You can replace this with your search bar + filters grid next */}
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
