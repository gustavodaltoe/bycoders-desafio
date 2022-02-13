import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import express from 'express';
import { makeUploadCnabController } from '../factories/controllers/UploadCnabControllerFactory';
import multer from 'multer';
import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { makeTextFileUploadMiddleware } from '../factories/middlewares/TextFileUploadMiddlewareFactory';

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } });

const cnabRouter = express.Router();

cnabRouter.post(
  '/upload',
  adaptMiddleware(makeTextFileUploadMiddleware()),
  adaptRoute(makeUploadCnabController()),
);

export { cnabRouter };
