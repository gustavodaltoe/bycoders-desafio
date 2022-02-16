import { AiOutlineLoading } from 'react-icons/ai';
import { styled } from '../../styles/stitches.config';

export const Wrapper = styled('div', {
  marginY: '4rem',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Title = styled('h2', {
  textAlign: 'center',
  width: '100%',
  marginBottom: '2rem',
  lineHeight: '5rem',
  borderBottom: '2px solid $primaryLighter',
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
  padding: '2rem',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1.5rem',
});

export const StoreName = styled('strong', {
  fontSize: '1.8rem',
});
