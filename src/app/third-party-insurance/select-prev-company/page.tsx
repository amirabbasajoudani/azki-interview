'use client';

import {
  handleUpdateInsurance,
  useInsuranceDispatch,
} from '@/providers/InsuranceContextProvider';
import { useGetCompanies } from '@/services/insureCompany';
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

export default function Page() {
  const t = useTranslations('/third-party-insurance/select-prev-company');
  const sharedT = useTranslations('shared');
  const insuranceDispatch = useInsuranceDispatch();

  const schema = yup.object({
    prev_company: yup.string().required(sharedT('required_field')),
  });

  type FormInputs = {
    prev_company: string;
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      prev_company: '',
    },
  });

  const router = useRouter();
  const { data, isLoading } = useGetCompanies();
  console.log(data);
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
        {t('select_previous_company')}
      </Typography>
      <form
        onSubmit={handleSubmit((formData) => {
          handleUpdateInsurance(insuranceDispatch, {
            previousCompany: data?.data.find(
              (apiData) => apiData.id === Number(formData.prev_company)
            )?.title,
          });
          router.push('/third-party-insurance/select-discount');
        })}
      >
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Controller
            name='prev_company'
            control={control}
            render={({ field }) => (
              <FormControl
                sx={{ minWidth: '50%', flexGrow: 1 }}
                error={!!errors.prev_company?.message}
              >
                <InputLabel id='prev_company_select_box'>
                  {sharedT('previous_company')}
                </InputLabel>
                <Select
                  {...field}
                  id='prev_company_select_box'
                  label={sharedT('previous_company')}
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
                <FormHelperText>{errors.prev_company?.message}</FormHelperText>
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
