import { Controller } from '@core/infra/Controller';
import { PrismaStoreOwnersRepository } from '@modules/cnab/repositories/prisma/PrismaStoreOwnersRepository';
import { PrismaStoresRepository } from '@modules/cnab/repositories/prisma/PrismaStoreRepository';
import { UploadCnab } from '@modules/cnab/useCases/UploadCnab/UploadCnab';
import { UploadCnabController } from '@modules/cnab/useCases/UploadCnab/UploadCnabController';

export function makeUploadCnabController(): Controller {
  const storeOwnersRepository = new PrismaStoreOwnersRepository();
  const StoresRepository = new PrismaStoresRepository();
  const uploadCnab = new UploadCnab(storeOwnersRepository, StoresRepository);
  return new UploadCnabController(uploadCnab);
}
