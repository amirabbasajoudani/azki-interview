import { createTheme } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      lime?: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      lime?: string;
    };
  }
}

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'var(--font-iranyekan)',
  },
  palette: {
    customColors: {
      lime: '#f6f4e6',
    },
    success: {
      main: '#67b49c',
    },
  },
});

export default theme;

export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
