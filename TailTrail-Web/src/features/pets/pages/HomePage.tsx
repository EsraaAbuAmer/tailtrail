import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchUserProfile } from '../../../store/slices/userSlice';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {user && <h2>Welcome, {user.name}!</h2>}
    </div>
  );
}
