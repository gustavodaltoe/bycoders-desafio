import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import express from 'express';
import { makeUploadCnabController } from '../factories/controllers/UploadCnabControllerFactory';
import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { makeTextFileUploadMiddleware } from '../factories/middlewares/TextFileUploadMiddlewareFactory';
import { makeListCnabController } from '../factories/controllers/ListCnabControllerFactory';

const cnabRouter = express.Router();

cnabRouter.post(
  '/upload',
  adaptMiddleware(makeTextFileUploadMiddleware()),
  adaptRoute(makeUploadCnabController()),
);

cnabRouter.get('/', adaptRoute(makeListCnabController()));

export { cnabRouter };
