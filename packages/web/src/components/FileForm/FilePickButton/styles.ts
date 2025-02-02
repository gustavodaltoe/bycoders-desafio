import { styled } from '../../../styles/stitches.config';

export const HiddenInput = styled('input', {
  display: 'none',
});

export const FileInfo = styled('p', {
  fontSize: '1.4rem',
  marginBottom: '1rem',
});

export const Button = styled('button', {
  borderRadius: '.8rem',
  width: '20rem',
  height: '5rem',
  background: '$primaryLighter',
  border: '1px dashed $contrastPrimary',
  transition: 'background .3s ease',
  '&:hover': {
    background: '$secondary',
  },
});
