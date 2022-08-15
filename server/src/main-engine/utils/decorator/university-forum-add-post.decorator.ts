/**dependencies */
import { ApiBody } from '@nestjs/swagger';
/**custom file upload interceptors */
const topics = 'topics';
const questionTitle = 'questionTitle';
const questionLink = 'questionLink';
const question = 'question';
const forumGroupId = 'forumGroupId';
const embeddedCode = 'embeddedCode';
export const UniversityForumAddPostApiBody =
  (file = 'file'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      type: 'multipart/form-data',
      required: true,
      schema: {
        type: 'object',
        properties: {
          [topics]: {
            type: 'array',
            nullable: false,
            examples: ['Admission Care'],
          },
          [questionTitle]: {
            type: 'string',
            maxLength: 50,
            nullable: false,
            example: 'How can I apply?',
          },
          [questionLink]: {
            type: 'string',
            maxLength: 50,
            nullable: false,
            example: 'Admission',
          },
          [question]: {
            type: 'string',
            maxLength: 100,
            nullable: false,
            example: 'What is total cost?',
          },
          // [userId]: {
          //   type: 'number',
          //   maxLength: 25,
          //   example: '23',
          // },
          [forumGroupId]: {
            type: 'number',
            nullable: false,
            example: '23',
          },

          // [userType]: {
          //   type: 'string',
          //   nullable: false,
          //   examples: ['admin'],
          // },
          [embeddedCode]: {
            type: 'string',
            examples: ['This is example embedded Code'],
          },
          [file]: {
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
