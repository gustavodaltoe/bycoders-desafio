import { Controller } from '@core/infra/Controller';
import { PrismaStoresRepository } from '@modules/cnab/repositories/prisma/PrismaStoreRepository';
import { ListCnab } from '@modules/cnab/useCases/ListCnab/ListCnab';
import { ListCnabController } from '@modules/cnab/useCases/ListCnab/ListCnabController';

export function makeListCnabController(): Controller {
  const storesRepository = new PrismaStoresRepository();
  const listCnab = new ListCnab(storesRepository);
  return new ListCnabController(listCnab);
}
