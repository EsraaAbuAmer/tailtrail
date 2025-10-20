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
        <CardMedia
          component="img"
          image={image}
          alt={pet.name}
          sx={{
            width: '100%',
            height: 200,
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        <Box sx={badgeStyle(pet.status)}>{pet.status.toUpperCase()}</Box>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight={700} noWrap>
          {pet.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          display="flex"
          alignItems="center"
          mt={0.5}
          noWrap
        >
          📍 {pet.location.city}, {pet.location.country}
        </Typography>
      </CardContent>

      <Box px={2} pb={2}>
        <Button variant="contained" fullWidth sx={buttonStyle}>
          View Details
        </Button>
      </Box>
    </Card>
  );
};
