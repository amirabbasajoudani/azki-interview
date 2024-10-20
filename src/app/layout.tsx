import type { Metadata } from 'next';
import './globals.css';
import font from '@/configs/local-font';
import ThemeProvider from '@/providers/ThemeProvider';
import { getLocale, getMessages } from 'next-intl/server';
import AuthContextProvider from '@/providers/AuthContextProvider';
import { NextIntlClientProvider } from 'next-intl';
import QueryClientProvider from '@/providers/ReacQueryProvider';

export const metadata: Metadata = {
  title: 'ازکی | بیمه',
  description: 'پلتفرم خرید بیمه خودرو',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${font.variable}`} dir='rtl'>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <QueryClientProvider>
              <AuthContextProvider>{children}</AuthContextProvider>
            </QueryClientProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
