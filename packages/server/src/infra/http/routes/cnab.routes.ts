import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import express from 'express';
import { makeUploadCnabController } from '../factories/controllers/UploadCnabControllerFactory';
import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { makeTextFileUploadMiddleware } from '../factories/middlewares/TextFileUploadMiddlewareFactory';

const cnabRouter = express.Router();

cnabRouter.post(
  '/upload',
  adaptMiddleware(makeTextFileUploadMiddleware()),
  adaptRoute(makeUploadCnabController()),
);

export { cnabRouter };
