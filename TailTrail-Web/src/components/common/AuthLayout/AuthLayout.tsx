import { Box, Typography, Container } from '@mui/material';
import {
  containerStyle,
  wrapperStyle,
  logoStyle,
  titleStyle,
  subtitleStyle,
} from './AuthLayout.styles';
import logo from '../../../assets/TailTrail-logo.png';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <Container maxWidth="sm" sx={containerStyle}>
      <Box sx={wrapperStyle}>
        <Box display="flex" justifyContent="center" alignItems="center" gap={1.5} mb={3}>
          <Box component="img" src={logo} alt="TailTrail logo" sx={logoStyle} />
          <Typography variant="h4" sx={titleStyle}>
            {title}
          </Typography>
        </Box>

        {/* ✅ Optional subtitle */}
        {subtitle && (
          <Typography variant="body1" sx={subtitleStyle}>
            {subtitle}
          </Typography>
        )}

        <Box>{children}</Box>
      </Box>
    </Container>
  );
};
