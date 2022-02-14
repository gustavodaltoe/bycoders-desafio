import { Controller } from '@core/infra/Controller';
import { HttpResponse, ok } from '@core/infra/HttpResponse';

type UploadCnabControllerRequest = {
  fileText: string;
};

export class UploadCnabController implements Controller {
  async handle(req: UploadCnabControllerRequest): Promise<HttpResponse> {
    const cnab = req.fileText;
    return ok({ cnab });
  }
}
