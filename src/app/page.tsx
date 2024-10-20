'use client';
import MainLayout from '@/layout/Main';
import { Box, Card, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const t = useTranslations('/');
  const router = useRouter();
  return (
    <MainLayout>
      <Typography
        variant='h6'
        sx={{ fontWeight: 700, mb: 3, textAlign: ['center', 'center', 'left'] }}
      >
        {t('select_insurance_type')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          justifyContent: ['center', 'center', 'start'],
        }}
      >
        <Card
          onClick={() => {
            router.push('/third-party-insurance/select-type');
          }}
          sx={{
            display: 'flex',
            cursor: 'pointer',
            borderRadius: 2,
            border: '2px solid',
            boxShadow: 'none',
            borderColor: 'grey.200',
            flexDirection: 'column',
            flexShrink: 0,
            flexBasis: '30%',
            flexGrow: 0,
            alignItems: 'center',
            p: 2,
            gap: 1,
          }}
        >
          <Image
            src='/images/icons/insurance.svg'
            width={24}
            height={24}
            alt='third_party_insurance_icon'
          />
          <Typography
            variant='body2'
            sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}
          >
            {t('third_party')}
          </Typography>
        </Card>
        <Card
          sx={{
            display: 'flex',
            borderRadius: 2,
            border: '2px solid',
            boxShadow: 'none',
            borderColor: 'grey.200',
            cursor: 'pointer',
            flexDirection: 'column',
            flexBasis: '30%',
            flexShrink: 0,
            flexGrow: 0,
            position: 'relative',
            alignItems: 'center',
            p: 2,
            gap: 1,
          }}
        >
          <Image
            src='/images/icons/insurance.svg'
            width={24}
            height={24}
            alt='third_party_insurance_icon'
          />
          <Typography variant='body2' sx={{ fontWeight: 700 }}>
            {t('body')}
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              background: 'rgba(245, 245, 245, 0.7)',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
              cursor: 'not-allowed',
            }}
          />
        </Card>
      </Box>
    </MainLayout>
  );
}
