import { Toaster } from 'react-hot-toast';
import { FileForm } from '../FileForm';
import * as S from './styles';

export function Main() {
  return (
    <>
      <S.Wrapper>
        <FileForm />
      </S.Wrapper>
      <Toaster />
    </>
  );
}
