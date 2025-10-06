import { useState } from 'react';
import { Box, FormControlLabel, Checkbox, Typography, Link } from '@mui/material';
import { AuthLayout } from '../../../components/common/AuthLayout/AuthLayout';
import { TextField } from '../../../components/common/TextField/TextField';
import { PrimaryButton } from '../../../components/common/PrimaryButton/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { login } from '../../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(login({ email: form.email, password: form.password })).unwrap();

      if (result.token) {
        navigate('/');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <AuthLayout title="Tail Trail" subtitle="Sign in to your Tail Trail account.">
      <Box component="form" onSubmit={handleSubmit}>
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

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <FormControlLabel
            control={<Checkbox name="remember" checked={form.remember} onChange={handleChange} />}
            label="Remember me"
          />
          <Link href="#" underline="hover" color="primary">
            Forgot password?
          </Link>
        </Box>

        <PrimaryButton type="submit" sx={{ mt: 2 }}>
          Sign In
        </PrimaryButton>

        <Typography mt={3} variant="body2">
          Don’t have an account?{' '}
          <Link href="/signup" underline="hover" color="primary" fontWeight="bold">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
