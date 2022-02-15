import { Store } from '../domain/store/store';

export interface StoresRepository {
  exists(ownerCpf: string, name: string): Promise<boolean>;
  findByName(ownerCpf: string, name: string): Promise<Store | undefined>;
  save(store: Store): Promise<void>;
  create(store: Store): Promise<void>;
}
