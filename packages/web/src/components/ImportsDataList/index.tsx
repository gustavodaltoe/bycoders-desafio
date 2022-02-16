import { useQuery } from 'react-query';
import { ImportsDataDto } from '../../dtos/ImportsData';
import { axios } from '../../services/axios';
import { formatMonetary } from '../../utils';
import * as S from './styles';

export function ImportsDataList() {
  const { data, isFetching } = useQuery<ImportsDataDto>(
    'importsData',
    async () => {
      const { data } = await axios.get('/cnab');
      return data;
    },
  );

  return (
    <S.Wrapper>
      {!data && !isFetching && <S.Title>Dados importados</S.Title>}
      {isFetching && <S.LoadingIcon size={26} />}

      <S.ListWrapper>
        {data?.map((store) => {
          return (
            <S.ListItem key={store.id}>
              <S.StoreName>{store.name}</S.StoreName>
              <div>
                <b>Dono(a):</b> {store.owner.name} ({store.owner.cpf})
              </div>
              <p>
                <b>Saldo:</b> {formatMonetary(store.balance)}
              </p>
            </S.ListItem>
          );
        })}
      </S.ListWrapper>
    </S.Wrapper>
  );
}
