/**dependencies */
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
/**custom file upload interceptors */
import { FileBodyExtenderInterceptor } from '../interceptors';

export function ApiFile(fieldName = 'file') {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    UseInterceptors(FileInterceptor(fieldName), FileBodyExtenderInterceptor),
  );
}
