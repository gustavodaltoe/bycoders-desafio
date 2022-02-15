import { Store } from '@modules/cnab/domain/store/store';
import { StoresRepository } from '../StoresRepository';

export class InMemoryStoresRepository implements StoresRepository {
  public items: Store[] = [];

  async exists(ownerCpf: string, name: string): Promise<boolean> {
    return this.items.some(
      (store) => store.ownerCpf === ownerCpf && store.name === name,
    );
  }

  async findByName(ownerCpf: string, name: string): Promise<Store | undefined> {
    return this.items.find(
      (store) => store.ownerCpf === ownerCpf && store.name === name,
    );
  }

  async save(store: Store): Promise<void> {
    const index = this.items.findIndex((item) => item.id === store.id);
    this.items[index] = store;
  }

  async create(store: Store): Promise<void> {
    this.items.push(store);
  }
}
