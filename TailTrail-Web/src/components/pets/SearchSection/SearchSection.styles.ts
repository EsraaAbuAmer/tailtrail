import { SxProps, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

export const searchContainer: SxProps<Theme> = {
  mb: 6,
};

export const searchInputWrapper: SxProps<Theme> = (theme) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 2,
  px: 2,
  py: 1,
  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
});

export const searchIconStyle: SxProps<Theme> = (theme) => ({
  color: alpha(theme.palette.text.primary, 0.4),
  position: 'absolute',
  left: 12,
});

export const filtersWrapper: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1.5,
  mt: 2,
};