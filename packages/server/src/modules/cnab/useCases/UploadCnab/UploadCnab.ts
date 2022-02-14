import { Either, left, right } from '@core/logic/Either';
import { EmptyCnabContentError } from './errors/EmptyCnabContentError';

type UploadCnabResponse = Either<EmptyCnabContentError, null>;

export class UploadCnab {
  async execute(cnab: string): Promise<UploadCnabResponse> {
    if (!cnab.trim().length) return left(new EmptyCnabContentError());

    return right(null);
  }
}
