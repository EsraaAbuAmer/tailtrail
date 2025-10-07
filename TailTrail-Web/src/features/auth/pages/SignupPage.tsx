import { useState } from 'react';
import { Box, MenuItem, Typography, Link, CircularProgress } from '@mui/material';
import { AuthLayout } from '../../../components/common/AuthLayout/AuthLayout';
import { TextField } from '../../../components/common/TextField/TextField';
import { PrimaryButton } from '../../../components/common/PrimaryButton/PrimaryButton';
import { formContainer } from './SignupPage.styles';
import { useCountries } from '../hooks/useCountries';
import { signupUser } from '../../../store/slices/authSlice';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    country: '',
    city: '',
  });

  const { countries, cities, loading, handleCountryChange } = useCountries();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'country') {
      handleCountryChange(value);
      setForm((prev) => ({ ...prev, city: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
      return;
    }
    try {
      await dispatch(
        signupUser({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          country: form.country,
          city: form.city,
        }),
      ).unwrap();
      enqueueSnackbar('Account created successfully! Please log in.', { variant: 'success' });
      navigate('/login');
    } catch (error) {
      enqueueSnackbar(error || 'Signup failed. Try again.', { variant: 'error' });
    }
  };

  return (
    <AuthLayout title="Tail Trail" subtitle="Create your Tail Trail account.">
      <Box component="form" onSubmit={handleSubmit} sx={formContainer}>
        <TextField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <TextField
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <TextField
            select
            label="Country"
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            sx={{ '& .MuiSelect-select': { textAlign: 'left' } }}
          >
            {countries.map((country) => (
              <MenuItem key={country.country} value={country.country}>
                {country.country}
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          select
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          required
          disabled={!form.country}
        >
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </TextField>

        <PrimaryButton type="submit" sx={{ mt: 2 }}>
          Sign Up
        </PrimaryButton>

        <Typography mt={3} variant="body2">
          Already have an account?{' '}
          <Link href="/login" underline="hover" color="primary" fontWeight="bold">
            Sign In
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
