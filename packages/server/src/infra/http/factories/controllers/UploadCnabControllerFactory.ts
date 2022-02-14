import { Controller } from '@core/infra/Controller';
import { UploadCnab } from '@modules/cnab/useCases/UploadCnab/UploadCnab';
import { UploadCnabController } from '@modules/cnab/useCases/UploadCnab/UploadCnabController';

export function makeUploadCnabController(): Controller {
  const uploadCnab = new UploadCnab();
  return new UploadCnabController(uploadCnab);
}
