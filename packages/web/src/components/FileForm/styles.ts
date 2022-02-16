import { styled } from '../../styles/stitches.config';

export const Wrapper = styled('div', {
  marginTop: '3rem',
});

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Title = styled('h3', {
  marginBottom: '3rem',
  textAlign: 'center',
});

export const SubmitButton = styled('button', {
  background: '$secondary',
  borderRadius: '50%',
  height: '6rem',
  width: '6rem',
  marginTop: '3rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '.6rem',
  fontWeight: '600',
  fontSize: '1.4rem',
  transition: 'background .6s ease-in-out',
  '&:disabled': {
    cursor: 'not-allowed',
    background: '$primaryLighter',
  },
});
