import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { textFieldStyle } from './TextField.styles';

interface TextFieldProps extends MuiTextFieldProps {
  label: string;
}

export const TextField = ({ label, type, ...props }: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  return (
    <MuiTextField
      label={label}
      fullWidth
      margin="normal"
      type={isPasswordField && !showPassword ? 'password' : 'text'}
      {...props}
      sx={{ ...textFieldStyle, ...props.sx }}
      InputProps={{
        ...props.InputProps,
        endAdornment: isPasswordField ? (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : (
          props.InputProps?.endAdornment
        ),
      }}
    />
  );
};
