import { Controller } from '@core/infra/Controller';
import { UploadCnabController } from '@modules/cnab/useCases/uploadCnab/UploadCnabController';

export function makeUploadCnabController(): Controller {
  return new UploadCnabController();
}
