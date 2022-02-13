import { Controller } from '@core/infra/Controller';
import { UploadCnabController } from '@modules/cnab/useCases/UploadCnab/UploadCnabController';

export function makeUploadCnabController(): Controller {
  return new UploadCnabController();
}
