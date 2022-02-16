import { prisma } from '@infra/prisma/client';
import { StoreOwner } from '@modules/cnab/domain/store-owner/store-owner';
import { Store } from '@modules/cnab/domain/store/store';
import { Transaction } from '@modules/cnab/domain/transaction/transaction';
import { StoresRepository } from '../StoresRepository';

export class PrismaStoresRepository implements StoresRepository {
  async exists(ownerCpf: string, name: string): Promise<boolean> {
    const storeExists = await prisma.store.findFirst({
      where: { ownerCpf, name },
    });
    return !!storeExists;
  }

  async list(): Promise<Store[]> {
    const stores = await prisma.store.findMany({
      include: { owner: true, transactions: true },
    });
    return stores.map((store) => {
      const owner = StoreOwner.create(store.owner, store.owner.cpf);
      const transactions = store.transactions
        .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
        .map((item) => Transaction.create(item, item.id));
      return Store.create({ ...store, owner, transactions }, store.id);
    });
  }

  async findByName(ownerCpf: string, name: string): Promise<Store | undefined> {
    const store = await prisma.store.findFirst({
      where: { ownerCpf, name },
    });
    if (!store) return;
    return Store.create(store, store.id);
  }

  async save(store: Store): Promise<void> {
    await prisma.store.update({
      where: { id: store.id },
      data: store.toPersistence(),
    });
  }

  async create(store: Store): Promise<void> {
    await prisma.store.create({ data: store.toPersistence() });
  }
}
