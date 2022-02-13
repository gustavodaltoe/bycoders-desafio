import { Middleware } from '@core/infra/Middleware';
import { TextFileUploadMiddleware } from '@infra/http/middlewares/TextFileUploadMiddleware';

export function makeTextFileUploadMiddleware(): Middleware {
  return new TextFileUploadMiddleware();
}
