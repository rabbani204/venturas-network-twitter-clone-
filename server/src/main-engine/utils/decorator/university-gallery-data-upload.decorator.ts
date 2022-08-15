/**dependencies */
import { ApiBody } from '@nestjs/swagger';
/**custom file upload interceptors */
const title = 'title';
const albumId = 'albumId';
const caption = 'caption';
const takeTime = 'takeTime';
const alt = 'alt';
const tag = 'tag';
export const UploadGalleryApiBody =
  (files = 'files'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      type: 'multipart/form-data',
      required: true,
      schema: {
        type: 'object',
        properties: {
          [title]: {
            type: 'array',
            maxLength: 200,
            description: 'array  of media title[string]',
            nullable: false,
          },
          [albumId]: {
            type: 'number',
            nullable: false,
            example: 1,
            description: 'university album id',
          },
          [caption]: {
            type: 'array',
            nullable: true,
            description: 'array  of caption[text]',
          },
          [takeTime]: {
            type: 'timestamp',
            nullable: true,
            description: 'array  of photo taken time[date time]',
            example: new Date(),
          },
          [alt]: {
            type: 'array',
            nullable: true,
            description: 'array  of alt[string]',
          },
          [tag]: {
            type: 'array',
            nullable: true,
            description: 'array  of tag[string]',
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
