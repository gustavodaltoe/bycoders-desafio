import { useQuery } from 'react-query';
import { ImportsDataDto } from '../../dtos/ImportsData';
import { axios } from '../../services/axios';
import * as S from './styles';

export function ImportsDataList() {
  const { data, isFetching } = useQuery<ImportsDataDto>(
    'importsData',
    async () => {
      const { data } = await axios.get('/cnab');
      console.log(typeof data);
      return data;
    },
  );

  return (
    <S.Wrapper>
      <S.Title>Dados importados</S.Title>
      {isFetching && <S.LoadingIcon size={26} />}

      <S.ListWrapper>
        {data?.map((store) => {
          return (
            <S.ListItem key={store.id}>
              <strong>Loja: {store.name}</strong>
              <div>
                <b>Benefíciario(a):</b> {store.owner.name} ({store.owner.cpf})
              </div>
            </S.ListItem>
          );
        })}
      </S.ListWrapper>
    </S.Wrapper>
  );
}
