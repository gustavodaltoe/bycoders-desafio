import { TransactionTypeKey } from '../domain/transaction-type/transaction-type';

export type CNABLineData = {
  type: TransactionTypeKey;
  date: Date;
  amount: number;
  cpf: string;
  card: string;
  storeOwner: string;
  store: string;
};
