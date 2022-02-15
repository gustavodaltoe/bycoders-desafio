import { Controller } from '@core/infra/Controller';
import { PrismaStoreOwnersRepository } from '@modules/cnab/repositories/prisma/PrismaStoreOwnersRepository';
import { UploadCnab } from '@modules/cnab/useCases/UploadCnab/UploadCnab';
import { UploadCnabController } from '@modules/cnab/useCases/UploadCnab/UploadCnabController';

export function makeUploadCnabController(): Controller {
  const storeOwnersRepository = new PrismaStoreOwnersRepository();
  const uploadCnab = new UploadCnab(storeOwnersRepository);
  return new UploadCnabController(uploadCnab);
}
