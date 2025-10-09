import { Box, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { filterButtonStyle } from './FilterButton.styles';

interface FilterOpenerProps {
  label: string;
  value?: string;
  onOpen: () => void;
  onClear?: () => void;
}

export const FilterOpener = ({ label, value, onOpen, onClear }: FilterOpenerProps) => {
  const active = Boolean(value);
  return (
    <Box
      component="button"
      onClick={!active ? onOpen : undefined}
      style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
    >
      <Box sx={filterButtonStyle(active)} display="flex" alignItems="center" gap={1} px={2} py={1}>
        <Typography fontWeight={600} fontSize="0.9rem" color="primary.main">
          {value || label}
        </Typography>

        {active ? (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onClear?.();
            }}
            sx={{ color: 'primary.main', p: 0 }}
            aria-label="clear filter"
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        ) : (
          <ExpandMoreIcon sx={{ fontSize: 18, color: 'primary.main' }} />
        )}
      </Box>
    </Box>
  );
};
