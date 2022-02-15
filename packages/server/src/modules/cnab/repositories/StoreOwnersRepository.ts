import { StoreOwner } from '../domain/store-owner/store-owner';

export interface StoreOwnersRepository {
  exists(cpf: string): Promise<boolean>;
  create(storeOwner: StoreOwner): Promise<void>;
}
