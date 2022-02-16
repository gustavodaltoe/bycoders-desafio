import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { ImportsDataDto } from '../../dtos/ImportsData';
import { axios } from '../../services/axios';
import { formatMonetary } from '../../utils';
import * as S from './styles';

export function ImportsDataList() {
  const { data, isLoading } = useQuery<ImportsDataDto>(
    'importsData',
    async () => {
      const { data } = await axios.get('/cnab');
      return data;
    },
  );

  return (
    <S.Wrapper>
      {!data && !isLoading && <S.Title>Dados importados</S.Title>}
      {isLoading && <S.LoadingIcon size={26} />}

      <S.ListWrapper>
        {data?.map((store) => {
          return (
            <S.ListItem key={store.id}>
              <S.ListItemHeader>
                <S.StoreName>{store.name}</S.StoreName>
                <div>
                  <b>Dono(a):</b> {store.owner.name} ({store.owner.cpf})
                </div>
                <p>
                  <b>Saldo:</b> {formatMonetary(store.balance)}
                </p>
              </S.ListItemHeader>
              <S.TableTitle>Transações:</S.TableTitle>
              <S.TransactionTable>
                <S.Tr>
                  <S.Th align="left" width={250}>
                    Tipo
                  </S.Th>
                  <S.Th align="left">Data</S.Th>
                  <S.Th align="right">Valor</S.Th>
                  <S.Th align="left">Cartão</S.Th>
                </S.Tr>
                {store.transactions.map((transaction) => {
                  return (
                    <S.Tr key={transaction.id}>
                      <S.Td>{transaction.type}</S.Td>
                      <S.Td>
                        {dayjs(transaction.dateTime).format(
                          'DD/MM/YYYY HH:mm:ss',
                        )}
                      </S.Td>
                      <S.Td align="right">
                        {formatMonetary(transaction.amount)}
                      </S.Td>
                      <S.Td>{transaction.card}</S.Td>
                    </S.Tr>
                  );
                })}
              </S.TransactionTable>
            </S.ListItem>
          );
        })}
      </S.ListWrapper>
    </S.Wrapper>
  );
}
