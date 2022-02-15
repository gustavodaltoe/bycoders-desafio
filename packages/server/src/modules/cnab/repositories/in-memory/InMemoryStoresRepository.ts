import { Store } from '@modules/cnab/domain/store/store';
import { StoresRepository } from '../StoresRepository';

export class InMemoryStoresRepository implements StoresRepository {
  public items: Store[] = [];

  async exists(ownerCpf: string, name: string): Promise<boolean> {
    return this.items.some(
      (store) => store.ownerCpf === ownerCpf && store.name === name,
    );
  }

  async create(store: Store): Promise<void> {
    this.items.push(store);
  }
}
