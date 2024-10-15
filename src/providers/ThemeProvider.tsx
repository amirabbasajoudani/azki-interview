'use client';
import { CacheProvider } from '@emotion/react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme, { cacheRtl } from '@/configs/theme';
import React, { PropsWithChildren } from 'react';
import { CssBaseline } from '@mui/material';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <AppRouterCacheProvider>
      <CacheProvider value={cacheRtl}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </CacheProvider>
    </AppRouterCacheProvider>
  );
};

export default ThemeProvider;
