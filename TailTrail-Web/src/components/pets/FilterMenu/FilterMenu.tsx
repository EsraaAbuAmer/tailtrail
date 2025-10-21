import { useState } from 'react';
import { Menu, MenuItem, ListItemText, Box, Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { menuPaperStyle, menuItemStyle } from './FilterMenu.styles';
import { filterButtonStyle } from '../FilterButton/FilterButton.styles';

interface FilterMenuProps {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string | null) => void;
}

export const FilterMenu = ({ label, options, value, onChange }: FilterMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (option: string) => {
    onChange?.(option);
    handleClose();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
  };

  return (
    <Box>
      <Box
        component="button"
        onClick={handleClick}
        style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
      >
        <Box
          sx={filterButtonStyle(open || !!value)}
          display="flex"
          alignItems="center"
          gap={1}
          px={2}
          py={1}
        >
          <Typography fontWeight={600} fontSize="0.9rem" color="primary.main">
            {value || label}
          </Typography>

          {value ? (
            <IconButton size="small" onClick={handleClear} sx={{ color: 'primary.main', p: 0 }}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          ) : (
            <ExpandMoreIcon sx={{ fontSize: 18, color: 'primary.main' }} />
          )}
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: menuPaperStyle }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleSelect(option)}
            selected={option === value}
            sx={menuItemStyle(option === value)}
          >
            <ListItemText
              primary={<Typography fontWeight={option === value ? 700 : 500}>{option}</Typography>}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
