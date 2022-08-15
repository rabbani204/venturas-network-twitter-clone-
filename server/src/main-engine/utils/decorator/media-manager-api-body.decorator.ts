/**dependencies */
import { ApiBody } from '@nestjs/swagger';
import { FileTypeEnum } from 'src/main-engine/common/enum';
/**custom file upload interceptors */
const mediaName = 'mediaName';
const alt = 'alt';
const tag = 'tag';
export const MediaManagerApiBody =
  (files = 'files'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      type: 'multipart/form-data',
      required: true,
      schema: {
        type: 'object',
        properties: {
          [mediaName]: {
            type: 'array',
            maxLength: 200,
            nullable: false,
            examples: ['Image'],
          },
          [alt]: {
            type: 'array',
            maxLength: 200,
            nullable: true,
            examples: ['Image'],
          },
          [tag]: {
            type: 'array',
            maxLength: 200,
            nullable: false,
            examples: ['Image'],
            enum: [FileTypeEnum.IMAGE, FileTypeEnum.VIDEO, FileTypeEnum.PDF],
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
