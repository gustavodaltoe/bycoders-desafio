import { Controller } from '@core/infra/Controller';
import { fail, HttpResponse, ok } from '@core/infra/HttpResponse';
import { ListCnab } from './ListCnab';

export class ListCnabController implements Controller {
  constructor(private readonly listCnab: ListCnab) {}

  async handle(): Promise<HttpResponse> {
    try {
      const result = await this.listCnab.execute();
      return ok(result);
    } catch (err) {
      return fail(err);
    }
  }
}
