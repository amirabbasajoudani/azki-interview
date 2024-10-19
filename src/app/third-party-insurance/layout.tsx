import MainLayout from '@/layout/Main';
import { Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import InsuranceContextProvider from '@/providers/InsuranceContextProvider';

export default function ThirdPartyInsuranceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations('/third-party-insurance');

  return (
    <InsuranceContextProvider>
      <MainLayout>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 700,
            mb: 3,
            textAlign: ['center', 'center', 'unset'],
          }}
        >
          {t('third_party_insurance')}
        </Typography>
        {children}
      </MainLayout>
    </InsuranceContextProvider>
  );
}
