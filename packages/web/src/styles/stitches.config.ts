import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      primary: '#151718',
      primaryLighter: '#2c2e30',
      contrastPrimary: '#fff',
      secondary: '#32275F',
      green: '#4BB543',
    },
  },
  media: {
    bp1: '(min-width: 480px)',
  },
  utils: {
    marginX: (value: any) => ({ marginLeft: value, marginRight: value }),
    marginY: (value: any) => ({ marginTop: value, marginBottom: value }),
    paddingX: (value: any) => ({ paddingLeft: value, paddingRight: value }),
    paddingY: (value: any) => ({ paddingTop: value, paddingBottom: value }),
  },
});
