import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { filterButtonStyle } from './FilterButton.styles';
import { Label } from '@mui/icons-material';

interface FilterButtonProps {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export const FilterButton = ({ label, onClick, active = false }: FilterButtonProps) => {
  return (
    <Button
      variant="contained"
      disableElevation
      onClick={onClick}
      sx={filterButtonStyle(active)}
      endIcon={<ExpandMoreIcon sx={{ fontSize: 18 }} />}
    >
      {label}
    </Button>
  );
};
