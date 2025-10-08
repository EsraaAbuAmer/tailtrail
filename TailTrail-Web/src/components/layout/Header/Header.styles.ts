import { SxProps, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

export const appBarStyle = (theme: Theme): SxProps<Theme> => ({
  backgroundColor: alpha(theme.palette.background.default, 0.8),
  backdropFilter: 'blur(6px)',
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
});

export const toolbarStyle: SxProps<Theme> = {
  minHeight: 64,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const brandWrapStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  textDecoration: 'none',
};

export const logoStyle: SxProps<Theme> = {
  width: 36,
  height: 36,
  objectFit: 'contain',
  display: 'block',
};

export const brandTextStyle: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: '1.125rem',
  color: 'text.primary',
};

export const navWrapStyle: SxProps<Theme> = {
  display: { xs: 'none', md: 'flex' },
  alignItems: 'center',
  gap: 2,
};

export const navLinkStyle: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: '0.9rem',
  textTransform: 'none',
  color: 'text.secondary',
  '&:hover': { color: 'primary.main', background: 'transparent' },
};

export const navLinkActiveStyle: SxProps<Theme> = {
  color: 'primary.main',
};

export const rightWrapStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
};

export const iconButtonStyle: SxProps<Theme> = {
  color: 'text.secondary',
  '&:hover': {
    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
    color: 'primary.main',
  },
};

export const avatarStyle: SxProps<Theme> = {
  width: 40,
  height: 40,
  borderRadius: '50%',
};