import { StoreOwner } from '@modules/cnab/domain/store-owner/store-owner';
import { StoreOwnersRepository } from '../StoreOwnersRepository';

export class InMemoryStoreOwnersRepository implements StoreOwnersRepository {
  public items: StoreOwner[] = [];

  async exists(cpf: string): Promise<boolean> {
    return this.items.some((storeOwner) => storeOwner.cpf === cpf);
  }

  async create(storeOwner: StoreOwner): Promise<void> {
    this.items.push(storeOwner);
  }
}
