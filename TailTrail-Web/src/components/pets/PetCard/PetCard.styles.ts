import { SxProps, Theme } from '@mui/material';

export const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 360,
  borderRadius: 1,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
  },
};

export const badgeStyle = (status: string) => ({
  position: 'absolute',
  top: 8,
  left: 8,
  backgroundColor:
    status.toLowerCase() === 'lost'
      ? '#ec7813'
      : status.toLowerCase() === 'found'
        ? 'rgba(16,185,129,0.9)'
        : 'gray',
  color: 'white',
  fontWeight: 600,
  borderRadius: '12px',
  padding: '4px 10px',
  fontSize: '0.75rem',
});

export const buttonStyle = {
  mt: 2,
  backgroundColor: '#ec7813',
  textTransform: 'none',
  fontWeight: 700,
  '&:hover': {
    backgroundColor: '#d46a0f',
  },
};
