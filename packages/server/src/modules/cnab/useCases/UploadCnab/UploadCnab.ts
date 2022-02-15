import { Either, left, right } from '@core/logic/Either';
import { StoreOwner } from '@modules/cnab/domain/store-owner/store-owner';
import { Store } from '@modules/cnab/domain/store/store';
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
    await Promise.all(
      parsedCnab.map(async (line) => {
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
        const store = Store.create({
          name: line.store,
          ownerCpf: line.cpf,
        });
        await this.storesRepository.create(store);
      }),
    );

    return right(null);
  }
}
