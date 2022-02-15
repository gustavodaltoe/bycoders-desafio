import { Transaction } from '@modules/cnab/domain/transaction/transaction';
import { TransactionsRepository } from '../TransactionsRepository';

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = [];

  async create(transaction: Transaction): Promise<void> {
    this.items.push(transaction);
  }
}
