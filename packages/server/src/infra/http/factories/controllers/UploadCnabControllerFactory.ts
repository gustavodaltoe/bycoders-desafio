import { Controller } from '@core/infra/Controller';
import { PrismaStoreOwnersRepository } from '@modules/cnab/repositories/prisma/PrismaStoreOwnersRepository';
import { PrismaStoresRepository } from '@modules/cnab/repositories/prisma/PrismaStoreRepository';
import { PrismaTransactionsRepository } from '@modules/cnab/repositories/prisma/PrismaTransactionsRepository';
import { UploadCnab } from '@modules/cnab/useCases/UploadCnab/UploadCnab';
import { UploadCnabController } from '@modules/cnab/useCases/UploadCnab/UploadCnabController';

export function makeUploadCnabController(): Controller {
  const storeOwnersRepository = new PrismaStoreOwnersRepository();
  const storesRepository = new PrismaStoresRepository();
  const transactionsRepository = new PrismaTransactionsRepository();
  const uploadCnab = new UploadCnab(
    storeOwnersRepository,
    storesRepository,
    transactionsRepository,
  );
  return new UploadCnabController(uploadCnab);
}
