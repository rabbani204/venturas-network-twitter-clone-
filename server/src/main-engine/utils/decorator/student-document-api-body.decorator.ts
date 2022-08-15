/**dependencies */
import { ApiBody } from '@nestjs/swagger';
/**custom file upload interceptors */
const documentName = 'documentName';
const documentId = 'documentId';
export const StudentDocApiBody =
  (files = 'files'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      type: 'multipart/form-data',
      required: true,
      schema: {
        type: 'object',
        properties: {
          [documentName]: {
            type: 'array',
            nullable: false,
            examples: ['custom file name'],
          },
          [documentId]: {
            type: 'number',
            nullable: false,
            example: 'document id',
          },
          [files]: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
