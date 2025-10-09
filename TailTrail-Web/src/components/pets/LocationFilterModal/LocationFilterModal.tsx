import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  MenuItem,
  Slider,
  Button,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { TextField } from '../../common/TextField/TextField';
import { useCountries } from '../../../features/auth/hooks/useCountries';
import { dialogContentStyle, distanceLabelStyle } from './LocationFilterModal.styles';

interface Props {
  open: boolean;
  onClose: () => void;
  value: { country: string; city: string; distance: number };
  onApply: (payload: { country: string; city: string; distance: number }) => void;
}

export default function LocationFilterModal({ open, onClose, value, onApply }: Props) {
  const { countries, cities, loading, handleCountryChange } = useCountries();
  const [country, setCountry] = useState(value.country || '');
  const [city, setCity] = useState(value.city || '');
  const [distance, setDistance] = useState<number>(value.distance || 5000);

  useEffect(() => {
    setCountry(value.country || '');
    setCity(value.city || '');
    setDistance(value.distance || 5000);
    if (value.country) handleCountryChange(value.country);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const kmLabel = useMemo(() => `${Math.round(distance / 1000)} km`, [distance]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Choose Location</DialogTitle>
      <DialogContent sx={dialogContentStyle}>
        {/* Country */}
        <TextField
          select
          label="Country"
          name="country"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            handleCountryChange(e.target.value);
            setCity('');
          }}
          required
          disabled={loading}
          sx={{ '& .MuiSelect-select': { textAlign: 'left' } }}
        >
          {countries.map((c) => (
            <MenuItem key={c.country} value={c.country}>
              {c.country}
            </MenuItem>
          ))}
        </TextField>

        {/* City */}
        <TextField
          select
          label="City"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          disabled={!country}
          sx={{ '& .MuiSelect-select': { textAlign: 'left' } }}
        >
          {cities.map((ct) => (
            <MenuItem key={ct} value={ct}>
              {ct}
            </MenuItem>
          ))}
        </TextField>

        {/* Distance */}
        <Box mt={1}>
          <Typography sx={distanceLabelStyle}>Distance: {kmLabel}</Typography>
          <Slider
            value={distance}
            onChange={(_, v) => setDistance(v as number)}
            min={1000}
            max={10000}
            step={500}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `${Math.round((v as number) / 1000)} km`}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onApply({ country, city, distance });
            onClose();
          }}
          variant="contained"
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
