import { Either, left, right } from '@core/logic/Either';
import { StoreOwner } from '@modules/cnab/domain/store-owner/store-owner';
import { Store } from '@modules/cnab/domain/store/store';
import { TransactionType } from '@modules/cnab/domain/transaction-type/transaction-type';
import { StoreOwnersRepository } from '@modules/cnab/repositories/StoreOwnersRepository';
import { StoresRepository } from '@modules/cnab/repositories/StoresRepository';
import { CnabParser } from '../CnabParser/CnabParser';
import { EmptyCnabContentError } from './errors/EmptyCnabContentError';

type UploadCnabResponse = Either<EmptyCnabContentError, null>;

export class UploadCnab {
  constructor(
    private storeOwnersRepository: StoreOwnersRepository,
    private storesRepository: StoresRepository,
  ) {}

  async execute(cnab: string): Promise<UploadCnabResponse> {
    if (!cnab.trim().length) return left(new EmptyCnabContentError());

    const parsedCnab = CnabParser.execute(cnab);
    for (const line of parsedCnab) {
      const storeOwnerExists = await this.storeOwnersRepository.exists(
        line.cpf,
      );
      if (!storeOwnerExists) {
        const storeOwner = StoreOwner.create(
          {
            cpf: line.cpf,
            name: line.storeOwner,
          },
          line.cpf,
        );
        await this.storeOwnersRepository.create(storeOwner);
      }
      const persistedStore = await this.storesRepository.findByName(
        line.cpf,
        line.store,
      );
      const amount = line.amount * TransactionType[line.type].signal;
      if (!persistedStore) {
        const store = Store.create({
          name: line.store,
          ownerCpf: line.cpf,
          balance: amount,
        });
        await this.storesRepository.create(store);
      } else {
        persistedStore.addBalance(amount);
        await this.storesRepository.save(persistedStore);
      }
    }

    return right(null);
  }
}
