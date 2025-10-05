import { Button, Typography, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from './store';
import { increment, decrement } from './store/slices/counterSlice';
import { useEffect } from 'react';
import { testApi } from './api/testApi';

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    testApi().then(console.log).catch(console.error);
  }, []);
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" color="primary">
        Counter: {count}
      </Typography>
      <Button onClick={() => dispatch(increment())} sx={{ mr: 2 }} variant="contained">
        Increment
      </Button>
      <Button onClick={() => dispatch(decrement())} variant="outlined">
        Decrement
      </Button>
    </Container>
  );
}

export default App;
