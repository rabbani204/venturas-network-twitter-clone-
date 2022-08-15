/**dependencies */
import { ApiBody } from '@nestjs/swagger';
/**custom file upload interceptors */
const documentName = 'documentName';
export const UpdateStudentDocApiBody =
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
