import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FilesBodyExtenderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    let mediaName = '';
    let alt = '';
    let tag = '';

    if (Array.isArray(req.body.mediaName)) {
      mediaName = req.body.mediaName;
    } else {
      mediaName = req.body.mediaName.split(',');
    }
    if (Array.isArray(req.body.alt)) {
      alt = req.body.alt;
    } else {
      alt = req.body.alt.split(',');
    }
    if (Array.isArray(req.body.tag)) {
      tag = req.body.tag;
    } else {
      tag = req.body.tag.split(',');
    }
    req.files['mediaName'] = mediaName;
    req.files['alt'] = alt;
    req.files['tag'] = tag;
    return next.handle();
  }
}
