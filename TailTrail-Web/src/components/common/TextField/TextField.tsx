import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import { textFieldStyle } from './TextField.styles';

export const TextField = (props: TextFieldProps) => {
  return (
    <MuiTextField
      fullWidth
      variant="outlined"
      margin="normal"
      {...props}
      sx={{ ...textFieldStyle, ...props.sx }}
    />
  );
};
