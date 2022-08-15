/**dependencies */
import { ApiBody } from '@nestjs/swagger';
/**custom file upload interceptors */
const firstName = 'firstName';
const lastName = 'lastName';
const email = 'email';
const phoneNumber = 'phoneNumber';
const currentCity = 'currentCity';
const interestedCitys = 'interestedCitys';
const careerId = 'careerId';
export const JobApplyApiBody =
  (file = 'file'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      type: 'multipart/form-data',
      required: true,
      schema: {
        type: 'object',
        properties: {
          [careerId]: {
            type: 'number',
            nullable: false,
            example: 'job id',
          },
          [firstName]: {
            type: 'string',
            maxLength: 50,
            nullable: false,
            example: 'applicant first name',
          },
          [lastName]: {
            type: 'string',
            maxLength: 50,
            nullable: false,
            example: 'applicant lastName',
          },
          [email]: {
            type: 'string',
            maxLength: 100,
            nullable: false,
            example: 'applicant email',
          },
          [phoneNumber]: {
            type: 'string',
            maxLength: 25,
            nullable: false,
            example: 'applicant phone number',
          },
          [currentCity]: {
            type: 'string',
            maxLength: 100,
            nullable: false,
            example: 'applicant current city',
          },

          [interestedCitys]: {
            type: 'array',
            nullable: false,
            examples: ['Dhaka'],
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
