import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header/Header';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUserProfile } from '../store/slices/authSlice';
import { useEffect } from 'react';

export const MainLayout = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUserProfile());
    }
  }, [token, user, dispatch]);

  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};
