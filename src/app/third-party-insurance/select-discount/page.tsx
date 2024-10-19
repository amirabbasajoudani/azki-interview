'use client';

import {
  handleUpdateInsurance,
  useInsuranceContext,
  useInsuranceDispatch,
} from '@/providers/InsuranceContextProvider';
import { useGetThirdDiscount } from '@/services/thirdDiscount';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function Page() {
  const t = useTranslations('/third-party-insurance/select-discount');
  const sharedT = useTranslations('shared');
  const insuranceDispatch = useInsuranceDispatch();
  const InsuranceContext = useInsuranceContext();

  const [isInquiryModalVisible, setInquiryModalVisibility] = useState(false);

  const closeInquiryModal = () => setInquiryModalVisibility(false);
  const openInquiryModal = () => setInquiryModalVisibility(true);

  const schema = yup.object({
    third_party_discount: yup.string().required(sharedT('required_field')),
    accidents_discount: yup.string().required(sharedT('required_field')),
  });

  type FormInputs = {
    third_party_discount: string;
    accidents_discount: string;
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      accidents_discount: '',
      third_party_discount: '',
    },
  });

  const { data, isLoading } = useGetThirdDiscount();
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
        {t('select_discount_percentage')}
      </Typography>
      <form
        onSubmit={handleSubmit((formData) => {
          handleUpdateInsurance(insuranceDispatch, {
            thirdPartyDiscount: data?.data.find(
              (apiData) => apiData.id === Number(formData.third_party_discount)
            )?.title,
            accidentsDiscount: data?.data.find(
              (apiData) => apiData.id === Number(formData.accidents_discount)
            )?.title,
          });
          openInquiryModal();
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
            name='third_party_discount'
            control={control}
            render={({ field }) => (
              <FormControl
                sx={{ flexBasis: '50%', flexGrow: 1 }}
                error={!!errors.third_party_discount?.message}
              >
                <InputLabel id='third_party_discount_select_box'>
                  {sharedT('third_party_discount_percentage')}
                </InputLabel>
                <Select
                  {...field}
                  id='third_party_discount_select_box'
                  label={sharedT('third_party_discount_percentage')}
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
                <FormHelperText>
                  {errors.third_party_discount?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            name='accidents_discount'
            control={control}
            render={({ field }) => (
              <FormControl
                sx={{ flexBasis: '50%', flexGrow: 1 }}
                error={!!errors.accidents_discount?.message}
              >
                <InputLabel id='accidents_discount_select_box'>
                  {sharedT('accidents_discount_percentage')}
                </InputLabel>
                <Select
                  {...field}
                  id='accidents_discount_select_box'
                  label={sharedT('accidents_discount_percentage')}
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
                  {data?.data.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.accidents_discount?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Box>
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
              mt: 3,
            }}
            color='success'
          >
            {t('fee_inquiry')}
          </Button>
        </Box>
      </form>
      <Dialog
        open={isInquiryModalVisible}
        onClose={() => setInquiryModalVisibility(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle sx={{ textAlign: 'center' }} id='alert-dialog-title'>
          {t('selected_data')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 3,
                background: 'whitesmoke',
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='body1' color='textPrimary'>
                  {sharedT('car_type')}:
                </Typography>
                <Typography variant='body2'>
                  {InsuranceContext.carType}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='body1' color='textPrimary'>
                  {sharedT('car_model')}:
                </Typography>
                <Typography variant='body2'>
                  {InsuranceContext.carModel}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='body1' color='textPrimary'>
                  {sharedT('previous_company')}:
                </Typography>
                <Typography variant='body2'>
                  {InsuranceContext.previousCompany}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='body1' color='textPrimary'>
                  {sharedT('third_party_discount_percentage')}:
                </Typography>
                <Typography variant='body2'>
                  {InsuranceContext.thirdPartyDiscount}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='body1' color='textPrimary'>
                  {sharedT('accidents_discount_percentage')}:
                </Typography>
                <Typography variant='body2'>
                  {InsuranceContext.accidentsDiscount}
                </Typography>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant='outlined' onClick={closeInquiryModal}>
            {t('agree')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
