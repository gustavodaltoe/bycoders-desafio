import { Transaction } from '../domain/transaction/transaction';

export interface TransactionsRepository {
  create(transaction: Transaction): Promise<void>;
}
