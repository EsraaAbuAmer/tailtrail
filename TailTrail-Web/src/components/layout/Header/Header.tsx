import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  IconButton,
  Button,
  Avatar,
} from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import {
  appBarStyle,
  toolbarStyle,
  brandWrapStyle,
  logoStyle,
  brandTextStyle,
  navWrapStyle,
  navLinkStyle,
  navLinkActiveStyle,
  rightWrapStyle,
  iconButtonStyle,
  avatarStyle,
} from './Header.styles';
import logo from '../../../assets/TailTrail-logo.png';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const NAV = [
  { label: 'Report Lost', to: '/pets/report-lost' },
  { label: 'Report Found', to: '/pets/report-found' },
  { label: 'Browse Pets', to: '/' },
];

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <AppBar position="sticky" elevation={0} sx={appBarStyle}>
      <Container maxWidth="lg">
        <Toolbar sx={toolbarStyle}>
          {/* Brand */}
          <Box component={RouterLink} to="/" sx={brandWrapStyle}>
            <Box component="img" src={logo} alt="TailTrail logo" sx={logoStyle} />
            <Typography sx={brandTextStyle}>Tail Trail</Typography>
          </Box>

          {/* Nav (desktop) */}
          <Box sx={navWrapStyle}>
            {NAV.map((item) => {
              const active = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
              return (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  disableRipple
                  sx={[navLinkStyle, active && navLinkActiveStyle]}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {/* Right actions */}
          <Box sx={rightWrapStyle}>
            <IconButton sx={iconButtonStyle} aria-label="notifications">
              <NotificationsNoneOutlinedIcon />
            </IconButton>
            <Avatar
              sx={avatarStyle}
              alt="Profile"
              src="https://lh3.googleusercontent.com/a/default-user=s64"
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
