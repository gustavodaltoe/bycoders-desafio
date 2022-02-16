import { AiOutlineLoading } from 'react-icons/ai';
import { styled } from '../../styles/stitches.config';

export const Wrapper = styled('div', {
  marginTop: '4rem',
  lineHeight: '5rem',
  borderBottom: '2px solid $primaryLighter',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Title = styled('h2', {
  textAlign: 'center',
  marginBottom: '2rem',
});

export const LoadingIcon = styled(AiOutlineLoading, {
  animation: 'spin .8s linear infinite',
});

export const ListWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
});

export const ListItem = styled('div', {
  background: '$primaryLighter',
  width: '100%',
  borderRadius: '0.8rem',
  padding: '1rem 2rem',
});
