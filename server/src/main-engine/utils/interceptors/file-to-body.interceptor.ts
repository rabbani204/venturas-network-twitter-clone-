import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FileToBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (!req.file) {
      req.file = {};
      req.file['file'] = [];
    } else {
      const fileData = req.file;
      req.file = {};
      req.file['file'] = [fileData];
    }

    if (req.body) {
      Object.keys(req.body).forEach(function (key) {
        req.file[key] = req.body[key];
      });
    }
    return next.handle();
  }
}
