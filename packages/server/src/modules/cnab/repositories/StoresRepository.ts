import { Store } from '../domain/store/store';

export interface StoresRepository {
  exists(ownerCpf: string, name: string): Promise<boolean>;
  create(store: Store): Promise<void>;
}
