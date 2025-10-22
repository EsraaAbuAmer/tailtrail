import { useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, MenuItem, Typography } from '@mui/material';
import { TextField } from '../../../../components/common/TextField/TextField';
import { PrimaryButton } from '../../../../components/common/PrimaryButton/PrimaryButton';
import {
  formWrapper,
  titleStyle,
  subtitleStyle,
  row,
  fullRow,
  actionsRow,
} from './PetReportForm.styles';
import { useCountries } from '../../../auth/hooks/useCountries';

type Mode = 'lost' | 'found';

const petTypes = ['dog', 'cat', 'bird', 'rabbit', 'turtle', 'other'] as const;

const baseSchema = z.object({
  name: z.string().optional(),
  type: z.enum(petTypes),
  description: z.string().min(1, 'Description is required'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
});

type BaseForm = z.infer<typeof baseSchema>;

export interface PetReportFormProps {
  mode: Mode;
  onSubmitForm?: (data: BaseForm & { status: Mode }) => void;
  value: { country: string; city: string };
}

export const PetReportForm = ({ mode, onSubmitForm, value }: PetReportFormProps) => {
  const { countries, cities, loading, handleCountryChange } = useCountries();
  const [country, setCountry] = useState(value?.country || '');
  const [city, setCity] = useState(value?.city || '');

  const schema = useMemo(() => {
    return baseSchema.superRefine((values, ctx) => {
      if (mode === 'lost' && !values.name?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['name'],
          message: 'Name is required for lost pets',
        });
      }
    });
  }, [mode]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BaseForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      type: 'dog',
      description: '',
      country: value?.country || '',
      city: value?.city || '',
    },
  });

  useEffect(() => {
    setValue('country', country);
  }, [country, setValue]);

  useEffect(() => {
    setValue('city', city);
  }, [city, setValue]);

  const onSubmit = (values: BaseForm) => {
    onSubmitForm?.({ ...values, status: mode });
    console.log('Pet Report submit:', { ...values, status: mode });
  };

  return (
    <Box component="section" sx={formWrapper}>
      <Typography variant="h4" sx={titleStyle}>
        {mode === 'lost' ? 'Report a Lost Pet' : 'Report a Found Pet'}
      </Typography>
      <Typography variant="body2" sx={subtitleStyle}>
        {mode === 'lost'
          ? 'Fill out the form to help others find your missing pet.'
          : 'Share details so the owner can find their pet.'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {mode === 'lost' && (
          <Box sx={fullRow}>
            <TextField
              label="Pet’s Name"
              placeholder="e.g., Buddy"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Box>
        )}
        <Box sx={row}>
          <TextField
            select
            label="Pet Type"
            {...register('type')}
            error={!!errors.type}
            helperText={errors.type?.message as string}
          >
            {petTypes.map((t) => (
              <MenuItem key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Country"
            name="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              handleCountryChange(e.target.value);
              setCity('');
            }}
            required
            disabled={loading}
            sx={{ '& .MuiSelect-select': { textAlign: 'left' } }}
          >
            {countries.map((c) => (
              <MenuItem key={c.country} value={c.country}>
                {c.country}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={row}>
          <TextField
            select
            label="City"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            disabled={!country}
            sx={{ '& .MuiSelect-select': { textAlign: 'left' } }}
          >
            {cities.map((ct) => (
              <MenuItem key={ct} value={ct}>
                {ct}
              </MenuItem>
            ))}
          </TextField>
          <Box />
        </Box>

        {/* Description */}
        <Box sx={fullRow}>
          <TextField
            label="Description"
            placeholder="Describe the pet (breed, color, size, distinguishing marks)"
            multiline
            minRows={4}
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Box>
        <Box sx={actionsRow}>
          <PrimaryButton type="submit" fullWidth disabled={isSubmitting}>
            {mode === 'lost' ? 'Post Lost Pet Report' : 'Post Found Pet'}
          </PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
};
