import { SxProps, Theme } from '@mui/material/styles';

export const dialogContentStyle: SxProps<Theme> = {
  display: 'grid',
  gap: 2,
  minWidth: { xs: 'auto', sm: 420 },
};

export const distanceLabelStyle: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: '0.9rem',
};