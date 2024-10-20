'use client';

import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PropsWithChildren } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import CarLogo from 'public/images/icons/car-green.svg';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuthContext } from '@/providers/AuthContextProvider'; // import { usePathname, useRouter } from 'next/navigation';
import { usePathname, useRouter } from 'next/navigation';
import {
  useAuthDispatch,
  handleAddAuth,
} from '@/providers/AuthContextProvider';

function retrievePersistedAuth():
  | {
      firstName: string;
      lastName: string;
      role: 'manager';
      expireDate: string;
    }
  | undefined {
  try {
    const persistedAuth = JSON.parse(localStorage.getItem('auth') || '') as {
      firstName: string;
      lastName: string;
      role: 'manager';
      expireDate: string;
    };

    const currentDate = new Date().getTime();
    if (Number(persistedAuth.expireDate) < currentDate) {
      localStorage.removeItem('auth');
      return undefined;
    } else {
      return persistedAuth;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

const MainLayout = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const authState = useAuthContext();
  const authDispatch = useAuthDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('layout');
  const sharedT = useTranslations('shared');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!authState.firstName && pathname !== '/login') {
      const persistedAuth = retrievePersistedAuth();
      if (persistedAuth) {
        handleAddAuth(authDispatch, {
          firstName: persistedAuth.firstName,
          lastName: persistedAuth.lastName,
          role: 'manager',
        });
        return;
      }
      router.push('/login');
    }
  }, [authState, pathname, router, authDispatch]);

  return (
    <>
      <nav>
        <Grid
          container
          alignItems='center'
          justifyContent='space-between'
          sx={{
            px: [2, 2, 6],
            py: 2,
            gap: 2,
            flexWrap: 'nowrap',
            gridTemplateColumns: isMobile ? '1fr' : `repeat(3, 1fr)`,
          }}
        >
          <Grid sm item>
            <Image
              src='/images/icons/logo.svg'
              alt='navbar_logo'
              width={24}
              height={24}
            />
          </Grid>
          <Grid sm item>
            <Box>
              <Typography
                variant='body1'
                sx={{
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                {t('platform_name')}
              </Typography>
            </Box>
          </Grid>
          <Grid sm item>
            <Box>
              <Typography
                variant='body1'
                sx={{
                  pr: [0, 0, 3],
                  textAlign: 'right',
                }}
              >
                {authState.firstName ? (
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: 'end',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      src='/images/icons/user.svg'
                      width={24}
                      height={24}
                      alt='user_icon'
                    />
                    <Typography
                      variant='body1'
                      sx={{
                        maxWidth: '50%',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {`${authState.firstName} ${authState.lastName}`}
                    </Typography>
                  </Box>
                ) : (
                  sharedT('register')
                )}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </nav>
      <Box
        sx={{
          backgroundColor: ({ palette }) => palette.customColors.lime,
          width: ['unset', 'unset', '30vw'],
          height: ['20vh', '20vh', 'unset'],
          position: 'absolute',
          right: 0,
          left: [0, 0, 'unset'],
          top: ['unset', 'unset', 0],
          bottom: 0,
          zIndex: -1,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: ['90%', '90%', '5vh'],
            right: ['5%', '5%', '30%'],
            width: '1114px',
            maxWidth: ['35vh', '35vh', '40vw'],
          }}
        >
          <Image
            src={CarLogo}
            alt='car_logo'
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
      </Box>
      <Box sx={{ pr: [0, 0, '30vw'], pb: ['20vh', '20vh', 0] }}>
        {!authState.firstName && pathname !== '/login' ? (
          <Box
            sx={{
              width: '100%',
              height: '50vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress color='success' />
          </Box>
        ) : (
          <Box sx={{ px: [2, 2, 6] }}>
            <Box sx={{ maxWidth: ['unset', 'unset', '40vw'], pl: [0, 0, 4] }}>
              {children}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default MainLayout;
