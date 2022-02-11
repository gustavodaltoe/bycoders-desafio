import { globalCss } from './stitches.config';

const globalStyles = globalCss({
  ':root': {
    fontSize: '62.5%',
  },
  '@media(max-width: 640px)': {
    ':root': {
      fontSize: '50%',
    },
  },
  '*': {
    margin: 0,
    padding: 0,
    border: 0,
    boxSizing: 'border-box',
    outline: 'none',
  },
  html: {
    scrollBehavior: 'smooth',
  },
  body: {
    transition: 'background-color 0.25s ease 0s',
    background: '$primary',
  },
  'ul, ol': {
    listStyle: 'none',
  },
  'body, input, textarea, button': {
    font: "400 1.6rem 'Roboto', sans-serif",
    color: '$contrastPrimary',
  },
  button: {
    cursor: 'pointer',
  },
  img: {
    display: 'block',
  },
});

globalStyles();
