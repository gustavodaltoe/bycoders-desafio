import { Controller } from '@core/infra/Controller';
import { HttpResponse } from '@core/infra/HttpResponse';

type Request = {
  file: {
    buffer: Buffer;
  };
};

export class UploadCnabController implements Controller {
  async handle(req: any): Promise<HttpResponse> {
    const cnab = req.file.buffer.toString('utf-8');
    return {
      statusCode: 200,
      body: {
        message: 'Hello World!',
        cnab,
      },
    };
  }
}
