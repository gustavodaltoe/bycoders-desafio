import { prisma } from '@infra/prisma/client';
import { StoreOwner } from '@modules/cnab/domain/store-owner/store-owner';
import { StoreOwnersRepository } from '../StoreOwnersRepository';

export class PrismaStoreOwnersRepository implements StoreOwnersRepository {
  public async exists(cpf: string): Promise<boolean> {
    const storeOwnerExists = await prisma.storeOwner.findUnique({
      where: { cpf },
    });
    return !!storeOwnerExists;
  }

  public async create(storeOwner: StoreOwner): Promise<void> {
    await prisma.storeOwner.create({ data: storeOwner });
  }
}
