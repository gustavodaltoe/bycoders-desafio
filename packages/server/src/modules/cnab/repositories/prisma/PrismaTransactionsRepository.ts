import { prisma } from '@infra/prisma/client';
import { Transaction } from '@modules/cnab/domain/transaction/transaction';
import { TransactionsRepository } from '../TransactionsRepository';

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(transaction: Transaction): Promise<void> {
    await prisma.transaction.create({ data: transaction.toPersistence() });
  }
}
