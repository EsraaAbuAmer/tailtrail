import { SxProps, Theme } from '@mui/material/styles';

export const formWrapper: SxProps<Theme> = (theme) => ({
  maxWidth: 720,
  mx: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 3,
  p: { xs: 2, sm: 3, md: 4 },
  boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
  border: `1px solid ${theme.palette.primary.main}20`,
});

export const titleStyle: SxProps<Theme> = {
  fontWeight: 800,
  textAlign: 'center',
  mb: 1,
};

export const subtitleStyle: SxProps<Theme> = {
  textAlign: 'center',
  color: 'text.secondary',
  mb: 3,
};

export const row: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 2,
  mb: 2,
  '@media (min-width: 600px)': {
    gridTemplateColumns: '1fr 1fr',
  },
};

export const fullRow: SxProps<Theme> = {
  mb: 2,
};

export const actionsRow: SxProps<Theme> = {
  mt: 3,
};