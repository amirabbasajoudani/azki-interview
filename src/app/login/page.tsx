'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import {
  passwordRegex,
  persianLetterRegex,
  persianMobileRegex,
} from '@/utils/regex';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import MainLayout from '@/layout/Main';
import {
  useAuthDispatch,
  handleAddAuth,
} from '@/providers/AuthContextProvider';

type FormInputs = {
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
};

function persistAuth(authState: {
  firstName: string;
  lastName: string;
  role: 'manager';
}) {
  const anHourLater = new Date().getTime() + 60 * 60 * 1000;
  localStorage.setItem(
    'auth',
    JSON.stringify({ ...authState, expireDate: anHourLater })
  );
}

const LoginPage = () => {
  const t = useTranslations('/login');
  const sharedT = useTranslations('shared');

  const authDispatch = useAuthDispatch();

  const router = useRouter();

  const schema = yup.object({
    first_name: yup
      .string()
      .required(sharedT('required_field'))
      .matches(persianLetterRegex, sharedT('persian_only_error')),

    last_name: yup
      .string()
      .required(sharedT('required_field'))
      .matches(persianLetterRegex, sharedT('persian_only_error')),

    phone_number: yup
      .string()
      .required(sharedT('required_field'))
      .matches(persianMobileRegex, sharedT('mobile_format_error')),
    password: yup
      .string()
      .required(sharedT('required_field'))
      .matches(passwordRegex, sharedT('password_format_error')),
  });

  const onSubmitHandler = (data: FormInputs) => {
    const persistData = {
      firstName: data.first_name,
      lastName: data.last_name,
      role: 'manager',
    } as const;

    handleAddAuth(authDispatch, persistData);
    persistAuth(persistData);
    router.push('/');
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      password: '',
    },
  });

  return (
    <MainLayout>
      <Typography
        variant='h6'
        sx={{
          fontWeight: 700,
          mb: 3,
          textAlign: ['center', 'center', 'unset'],
        }}
      >
        {sharedT('register')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
          <Controller
            name='first_name'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={t('first_name')}
                error={Boolean(errors.first_name?.message)}
                helperText={errors.first_name?.message}
              ></TextField>
            )}
          />
          <Controller
            name='last_name'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={Boolean(errors.last_name?.message)}
                label={t('last_name')}
                helperText={errors.last_name?.message}
              ></TextField>
            )}
          />
        </Box>
        <Controller
          name='phone_number'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ mb: 2 }}
              fullWidth
              error={Boolean(errors.phone_number?.message)}
              helperText={errors.phone_number?.message}
              label={t('phone_number')}
            ></TextField>
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              sx={{ mb: 2 }}
              error={Boolean(errors.password?.message)}
              type='password'
              helperText={errors.password?.message}
              label={t('password')}
            ></TextField>
          )}
        />
        <Box sx={{ textAlign: ['center', 'center', 'right'] }}>
          <Button
            type='submit'
            variant='contained'
            sx={{
              borderRadius: 4,
              display: 'inline-block',
              color: 'white',
              px: 5,
              py: 1,
            }}
            color='success'
          >
            {sharedT('register')}
          </Button>
        </Box>
      </form>
    </MainLayout>
  );
};

export default LoginPage;
