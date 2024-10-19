'use client';

import { useGetVehicleTypes } from '@/services/vehicleType';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  useInsuranceDispatch,
  handleUpdateInsurance,
} from '@/providers/InsuranceContextProvider';

export default function Page() {
  const t = useTranslations('/third-party-insurance/select-type');
  const sharedT = useTranslations('shared');
  const insuranceDispatch = useInsuranceDispatch();

  const schema = yup.object({
    car_type: yup.string().required(sharedT('required_field')),
    car_model: yup.string().required(sharedT('required_field')),
  });

  type FormInputs = {
    car_type: string;
    car_model: string;
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      car_type: '',
      car_model: '',
    },
  });

  const router = useRouter();
  const { data, isLoading } = useGetVehicleTypes();
  return (
    <>
      <Typography
        variant='caption'
        sx={{
          color: 'GrayText',
          display: 'block',
          mb: 3,
          textAlign: ['center', 'center', 'left'],
        }}
      >
        {t('select_car_type')}
      </Typography>
      <form
        onSubmit={handleSubmit((formData) => {
          handleUpdateInsurance(insuranceDispatch, {
            carType: data?.data.find(
              (apiData) => apiData.id === Number(formData.car_type)
            )?.title,
            carModel: data?.data
              .find((apiData) => apiData.id === Number(formData.car_type))
              ?.usages.find(
                (apiData) => apiData.id === Number(formData.car_model)
              )?.title,
          });
          router.push('/third-party-insurance/select-prev-company');
        })}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            flexDirection: ['column', 'column', 'row'],
          }}
        >
          <Controller
            name='car_type'
            control={control}
            render={({ field }) => (
              <FormControl
                sx={{ flexBasis: '50%', flexGrow: 1 }}
                error={!!errors.car_type?.message}
              >
                <InputLabel id='car_type_select_box'>
                  {sharedT('car_type')}
                </InputLabel>
                <Select
                  {...field}
                  id='car_type_select_box'
                  label={sharedT('car_type')}
                  MenuProps={
                    isLoading
                      ? {
                          PaperProps: {
                            sx: {
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            },
                          },
                        }
                      : undefined
                  }
                >
                  {isLoading ? (
                    <MenuItem disabled>
                      <CircularProgress size={24} color='inherit' />
                    </MenuItem>
                  ) : (
                    data?.data.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.title}
                      </MenuItem>
                    ))
                  )}
                </Select>
                <FormHelperText>{errors.car_type?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            name='car_model'
            control={control}
            render={({ field }) => (
              <FormControl
                sx={{ flexBasis: '50%', flexGrow: 1 }}
                error={!!errors.car_model?.message}
              >
                <InputLabel id='car_model_select_box'>
                  {sharedT('car_model')}
                </InputLabel>
                <Select
                  {...field}
                  id='car_model_select_box'
                  label={sharedT('car_model')}
                  MenuProps={
                    isLoading
                      ? {
                          PaperProps: {
                            sx: {
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            },
                          },
                        }
                      : undefined
                  }
                >
                  {isLoading ? (
                    <MenuItem disabled>
                      <CircularProgress size={24} color='inherit' />
                    </MenuItem>
                  ) : (
                    data?.data
                      .find((item) => item.id === Number(watch('car_type')))
                      ?.usages.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.title}
                        </MenuItem>
                      ))
                  )}
                </Select>
                <FormHelperText>{errors.car_model?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={() => router.back()}
            type='button'
            startIcon={
              <Box sx={{ rotate: '180deg' }}>
                <Image
                  src='/images/icons/arrow.svg'
                  width={10}
                  height={10}
                  alt='arrow_icon'
                />
              </Box>
            }
            variant='outlined'
            sx={{
              borderRadius: 4,
              color: 'success',
              px: 5,
              py: 1,
            }}
            color='success'
          >
            {sharedT('back')}
          </Button>
          <Button
            endIcon={
              <Image
                src='/images/icons/arrow.svg'
                width={10}
                height={10}
                alt='arrow_icon'
              />
            }
            type='submit'
            variant='outlined'
            sx={{
              borderRadius: 4,
              color: 'success',
              px: 5,
              py: 1,
            }}
            color='success'
          >
            {sharedT('next_step')}
          </Button>
        </Box>
      </form>
    </>
  );
}
