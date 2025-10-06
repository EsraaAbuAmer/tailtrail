import { Button, ButtonProps } from '@mui/material';
import { primaryButtonStyle } from './PrimaryButton.styles';

export const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      size="large"
      sx={{ ...primaryButtonStyle, ...props.sx }}
      {...props}
    />
  );
};
