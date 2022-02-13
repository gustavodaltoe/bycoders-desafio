import { Controller } from '@core/infra/Controller';
import { HttpResponse } from '@core/infra/HttpResponse';

export class UploadCnabController implements Controller {
  async handle(): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: {
        message: 'Hello World!',
      },
    };
  }
}
