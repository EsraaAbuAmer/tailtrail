import { SxProps, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

export const filterButtonStyle = (active: boolean): SxProps<Theme> => (theme) => ({
  textTransform: 'none',
  borderRadius: 2,
  fontWeight: 600,
  fontSize: '0.875rem',
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, active ? 0.2 : 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, active ? 0.3 : 0.2),
  },
});