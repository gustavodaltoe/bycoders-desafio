import { Either, left, right } from '@core/logic/Either';
import { StoreOwner } from '@modules/cnab/domain/store-owner/store-owner';
import { StoreOwnersRepository } from '@modules/cnab/repositories/StoreOwnersRepository';
import { CnabParser } from '../CnabParser/CnabParser';
import { EmptyCnabContentError } from './errors/EmptyCnabContentError';

type UploadCnabResponse = Either<EmptyCnabContentError, null>;

export class UploadCnab {
  constructor(private storeOwnersRepository: StoreOwnersRepository) {}

  async execute(cnab: string): Promise<UploadCnabResponse> {
    if (!cnab.trim().length) return left(new EmptyCnabContentError());

    const parsedCnab = CnabParser.execute(cnab);
    await Promise.all(
      parsedCnab.map(async (line) => {
        const storeOwnerExists = await this.storeOwnersRepository.exists(
          line.cpf,
        );
        if (!storeOwnerExists) {
          const storeOwner = StoreOwner.create({
            cpf: line.cpf,
            name: line.storeOwner,
          });
          await this.storeOwnersRepository.create(storeOwner);
        }
      }),
    );

    return right(null);
  }
}
