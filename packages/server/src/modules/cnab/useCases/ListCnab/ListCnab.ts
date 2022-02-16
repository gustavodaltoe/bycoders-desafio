import {
  TransactionType,
  TransactionTypeKey,
} from '@modules/cnab/domain/transaction-type/transaction-type';
import { StoresRepository } from '@modules/cnab/repositories/StoresRepository';

export class ListCnab {
  constructor(private readonly storesRepository: StoresRepository) {}

  async execute() {
    const result = await this.storesRepository.list();
    const stores = result.map((store) => {
      return {
        id: store.id,
        name: store.name,
        owner: {
          cpf: store.owner?.cpf,
          name: store.owner?.name,
        },
        balance: store.balance,
        transactions: store.transactions.map((transaction) => ({
          id: transaction.id,
          type: TransactionType[transaction.type as TransactionTypeKey].type,
          amount: transaction.amount,
          card: transaction.card,
          dateTime: transaction.dateTime,
        })),
      };
    });
    return stores;
  }
}
