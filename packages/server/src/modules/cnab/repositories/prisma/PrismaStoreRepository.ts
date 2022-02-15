import { prisma } from '@infra/prisma/client';
import { Store } from '@modules/cnab/domain/store/store';
import { StoresRepository } from '../StoresRepository';

export class PrismaStoresRepository implements StoresRepository {
  async exists(ownerCpf: string, name: string): Promise<boolean> {
    const storeExists = await prisma.store.findFirst({
      where: { ownerCpf, name },
    });
    return !!storeExists;
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
