import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: 12,
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));
