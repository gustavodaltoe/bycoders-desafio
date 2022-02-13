import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import express from 'express';
import { makeUploadCnabController } from '../factories/controllers/UploadCnabControllerFactory';

const cnabRouter = express.Router();

cnabRouter.post('/upload', adaptRoute(makeUploadCnabController()));

export { cnabRouter };
