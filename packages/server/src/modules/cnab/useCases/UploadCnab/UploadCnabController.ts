import { Controller } from '@core/infra/Controller';
import {
  clientError,
  created,
  fail,
  HttpResponse,
} from '@core/infra/HttpResponse';
import { UploadCnab } from './UploadCnab';

type UploadCnabControllerRequest = {
  fileText: string;
};

export class UploadCnabController implements Controller {
  constructor(private readonly uploadCnab: UploadCnab) {}

  async handle(req: UploadCnabControllerRequest): Promise<HttpResponse> {
    const cnab = req.fileText;
    try {
      const result = await this.uploadCnab.execute(cnab);
      if (result.isLeft()) {
        const error = result.value;
        return clientError(error);
      }
      return created();
    } catch (err) {
      return fail(err);
    }
  }
}
