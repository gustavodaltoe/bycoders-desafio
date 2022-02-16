type OwnerDto = {
  cpf: string;
  name: string;
};

type TransactionDto = {
  id: string;
  type: string;
  amount: number;
  card: string;
  dateTime: Date;
};

type StoreDto = {
  id: string;
  name: string;
  owner: OwnerDto;
  balance: number;
  transactions: TransactionDto[];
};

export type ImportsDataDto = StoreDto[];
