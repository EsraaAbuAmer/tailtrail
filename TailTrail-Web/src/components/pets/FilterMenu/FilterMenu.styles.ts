import { SxProps, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

export const menuPaperStyle: SxProps<Theme> = (theme) => ({
  borderRadius: 2,
  boxShadow: theme.shadows[3],
  mt: 1,
  minWidth: 160,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  bgcolor: theme.palette.background.paper,
});

export const menuItemStyle = (selected: boolean): SxProps<Theme> => (theme) => ({
  fontSize: '0.9rem',
  borderRadius: 1,
  color: selected ? theme.palette.primary.main : theme.palette.text.primary,
  backgroundColor: selected ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
});

export const selectedLabelBox: SxProps<Theme> = {
  position: 'absolute',
  top: -8,
  right: -12,
  display: 'flex',
  alignItems: 'center',
  bgcolor: 'background.paper',
  px: 1,
  py: 0.25,
  borderRadius: 2,
  boxShadow: 1,
};