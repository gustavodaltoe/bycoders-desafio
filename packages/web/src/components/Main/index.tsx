import { Toaster } from 'react-hot-toast';
import { FileForm } from '../FileForm';
import { ImportsDataList } from '../ImportsDataList';
import * as S from './styles';

export function Main() {
  return (
    <>
      <S.Wrapper>
        <FileForm />
        <ImportsDataList />
      </S.Wrapper>
      <Toaster />
    </>
  );
}
