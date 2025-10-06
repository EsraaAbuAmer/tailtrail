import { SxProps, Theme } from '@mui/material/styles';

export const containerStyle: SxProps<Theme> = {
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'background.default',
};

export const wrapperStyle: SxProps<Theme> = {
  width: '100%',
  textAlign: 'center',
};

export const logoStyle: SxProps<Theme> = {
  height: 70,
  width: 70,
  objectFit: 'contain',
};

export const titleStyle: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: '1.8rem',
  color: 'primary.main',
};

export const subtitleStyle: SxProps<Theme> = {
  color: 'text.secondary',
  mb: 3,
};