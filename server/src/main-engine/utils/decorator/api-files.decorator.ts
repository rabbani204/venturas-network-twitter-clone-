/**dependencies */
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
/**custom file upload interceptors */
import { FilesBodyExtenderInterceptor } from '../interceptors';

export function ApiFiles(fieldName = 'files') {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    UseInterceptors(FilesInterceptor(fieldName), FilesBodyExtenderInterceptor),
  );
}
