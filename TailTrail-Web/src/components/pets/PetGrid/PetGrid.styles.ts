import { SxProps, Theme } from '@mui/material';

export const gridContainerStyle: SxProps<Theme> = {
  mt: 2,
};

export const loadingStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  mt: 6,
};

export const emptyTextStyle: SxProps<Theme> = {
  textAlign: 'center',
  mt: 4,
  color: 'text.secondary',
};
