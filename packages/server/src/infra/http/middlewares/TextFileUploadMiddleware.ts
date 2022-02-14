import { clientError, HttpResponse, ok } from '@core/infra/HttpResponse';
import { Middleware } from '@core/infra/Middleware';
import { Request, Response } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'text/plain') {
      return cb(new Error('Only txt extension allowed.'));
    }
    return cb(null, true);
  },
}).single('textFile');

export class TextFileUploadMiddleware implements Middleware {
  async handle(request: Request): Promise<HttpResponse> {
    return new Promise<HttpResponse>((resolve) => {
      upload(request, {} as Response, (err) => {
        const isMulterError = err instanceof multer.MulterError;
        if (isMulterError) {
          resolve(clientError(err));
        } else if (err) {
          resolve(fail(err));
        } else {
          const content = request.file?.buffer.toString('utf8');
          resolve(ok({ fileText: content }));
        }
      });
    });
  }
}
