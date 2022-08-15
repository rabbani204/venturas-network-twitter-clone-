import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FileBodyExtenderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (!req.file) {
      req.file = {};
    }

    req.file['mediaName'] = req.body.mediaName;
    req.file['alt'] = req.body.alt;
    req.file['tag'] = req.body.tag;
    return next.handle();
  }
}
