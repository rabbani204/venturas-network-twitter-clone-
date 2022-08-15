/**dependencies */
import { ApiBody } from '@nestjs/swagger';
import { SalaryTypeEnum } from 'src/main-engine/common/enum';
/**custom file upload interceptors */
const careerTitle = 'careerTitle';
const designation = 'designation';
const careerCategoryId = 'careerCategoryId';
const careerType = 'careerType';
const careerSkills = 'careerSkills';
const applicationDeadline = 'applicationDeadline';
const careerDescription = 'careerDescription';
const qualification = 'qualification';
const experience = 'experience';
const salaryRangeMin = 'salaryRangeMin';
const salaryRangeMax = 'salaryRangeMax';
const salaryType = 'salaryType';
const vacancy = 'vacancy';
// const jobLocation = 'salaryType';
const countryId = 'countryId';
const citys = 'citys';
export const JobPostApiBody =
  (file = 'file'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      type: 'multipart/form-data',
      required: true,
      schema: {
        type: 'object',
        properties: {
          [careerTitle]: {
            type: 'string',
            maxLength: 255,
            nullable: false,
            example: 'job title',
          },
          [designation]: {
            type: 'string',
            maxLength: 255,
            nullable: false,
            example: 'job designation',
          },
          [careerCategoryId]: {
            type: 'number',
            nullable: false,
            example: 'job category Id',
          },
          [careerType]: {
            type: 'array',
            nullable: false,
            items: {
              type: 'string',
            },
          },
          [careerSkills]: {
            type: 'array',
            nullable: false,
            examples: ['PHP', 'Node Js'],
          },
          [applicationDeadline]: {
            type: 'timestamp',
            nullable: false,
            example: new Date(),
          },
          [careerDescription]: {
            type: 'string',
            nullable: false,
            example: 'job description',
          },
          [qualification]: {
            type: 'string',
            nullable: false,
            example: 'job qualification',
          },
          [experience]: {
            type: 'string',
            nullable: false,
            example: 'job qualification',
          },
          [salaryRangeMin]: {
            type: 'number',
            nullable: false,
            example: '50000.00',
          },
          [salaryRangeMax]: {
            type: 'number',
            nullable: false,
            example: '50000.00',
          },
          [salaryType]: {
            type: 'string',
            nullable: false,
            enum: [
              SalaryTypeEnum.MONTHLY,
              SalaryTypeEnum.WEEKLY,
              SalaryTypeEnum.YEARLY,
            ],
          },
          [vacancy]: {
            type: 'number',
            nullable: false,
            example: '5',
          },
          [countryId]: {
            type: 'number',
            nullable: false,
            example: '1',
          },
          [citys]: {
            type: 'array',
            nullable: false,
            examples: [52],
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
