import { Router } from 'express';
import { cnabRouter } from './cnab.routes';

const router = Router();

router.use('/cnab', cnabRouter);

export { router };
