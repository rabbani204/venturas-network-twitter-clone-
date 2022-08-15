/**dependencies */
import { ApiBody } from '@nestjs/swagger';
import { MaritalStatusEnum, StatusField } from 'src/main-engine/common/enum';

const firstName = 'firstName';
const middleName = 'middleName';
const lastName = 'lastName';
const dob = 'dob';
const password = 'password';
const countryId = 'countryId';
const stateId = 'stateId';
const cityId = 'cityId';
const address = 'address';
const mobile = 'mobile';
const whatsapp = 'whatsapp';
const workingCountry = 'workingCountry';
const bio = 'bio';
const timeZone = 'timeZone';
const maritalStatus = 'maritalStatus';
const profileImageId = 'profileImageId';
const sortNo = 'sortNo';
const postalCode = 'postalCode';
const status = 'status';
export const UpdateCounsellorApiBody =
  (file = 'file'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      type: 'multipart/form-data',
      schema: {
        type: 'object',
        properties: {
          [firstName]: {
            type: 'string',
            nullable: true,
          },
          [middleName]: {
            type: 'string',
            nullable: true,
          },
          [lastName]: {
            type: 'string',
            nullable: true,
          },
          [dob]: {
            type: 'string',
            nullable: true,
          },
          [password]: {
            type: 'string',
            nullable: true,
          },
          [countryId]: {
            type: 'number',
            nullable: true,
          },
          [stateId]: {
            type: 'number',
            nullable: true,
          },
          [cityId]: {
            type: 'number',
            nullable: true,
          },
          [address]: {
            type: 'string',
            nullable: true,
          },
          [mobile]: {
            type: 'string',
            nullable: true,
          },
          [whatsapp]: {
            type: 'string',
            nullable: true,
          },
          [postalCode]: {
            type: 'string',
            nullable: true,
          },
          [workingCountry]: {
            type: 'array',
            nullable: true,
            examples: ['142, 145'],
          },
          [bio]: {
            type: 'string',
            nullable: true,
          },
          [timeZone]: {
            type: 'string',
            nullable: true,
          },
          [file]: {
            type: 'string',
            format: 'binary',
            nullable: true,
          },
          [profileImageId]: {
            type: 'number',
            nullable: true,
          },
          [sortNo]: {
            type: 'number',
            nullable: true,
          },
          [maritalStatus]: {
            type: 'enum',
            nullable: true,
            enum: [MaritalStatusEnum.MARRIED, MaritalStatusEnum.UNMARRIED],
          },
          [status]: {
            type: 'enum',
            nullable: true,
            enum: [
              StatusField.ACTIVE,
              StatusField.DELETED,
              StatusField.DRAFT,
              StatusField.INACTIVE,
            ],
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
