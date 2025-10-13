import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { Pet } from '../../../types/pet';
import { cardStyle, badgeStyle, buttonStyle } from './PetCard.styles';

interface PetCardProps {
  pet: Pet;
}

export const PetCard = ({ pet }: PetCardProps) => {
  const image = pet.photos?.[0].url || 'https://via.placeholder.com/400x300?text=No+Image';
  return (
    <Card sx={cardStyle}>
      <Box position="relative">
        <CardMedia component="img" height="200" image={image} alt={pet.name} />
        <Box sx={badgeStyle(pet.status)}>{pet.status.toUpperCase()}</Box>
      </Box>

      <CardContent>
        <Typography variant="h6" fontWeight={700}>
          {pet.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          display="flex"
          alignItems="center"
          mt={0.5}
        >
          📍 {pet.location.city}, {pet.location.country}
        </Typography>

        <Button variant="contained" fullWidth sx={buttonStyle}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
