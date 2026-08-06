import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogsMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl } = request;
    const debut = Date.now();

    response.on('finish', () => {
      const duree = Date.now() - debut;
      const code = response.statusCode;
      console.log(`[${method}] ${originalUrl} -> ${code} (${duree}ms)`);
    });

    next();
  }
}