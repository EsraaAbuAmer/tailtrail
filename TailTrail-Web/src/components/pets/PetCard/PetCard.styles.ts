import { SxProps, Theme } from '@mui/material';

export const cardStyle: SxProps<Theme> = {
  borderRadius: 2,
  overflow: 'hidden',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  transition: '0.3s',
  backgroundColor: 'background.paper',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
};

export const badgeStyle = (status: string): SxProps<Theme> => ({
  position: 'absolute',
  top: 10,
  left: 10,
  bgcolor: status === 'Lost' ? 'error.main' : 'success.main',
  color: 'white',
  px: 1.5,
  py: 0.5,
  borderRadius: '9999px',
  fontSize: '0.75rem',
  fontWeight: 600,
});

export const buttonStyle: SxProps<Theme> = {
  mt: 2,
  borderRadius: '0.75rem',
  fontWeight: 600,
  backgroundColor: 'primary.main',
  '&:hover': {
    backgroundColor: 'primary.dark',
  },
};
