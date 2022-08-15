/**dependencies */
import { ApiBody } from '@nestjs/swagger';
import { UniversityDocTypeEnum } from 'src/main-engine/common/enum/university-doc-type';
/**custom file upload interceptors */
const name = 'name';
const alt = 'alt';
const documentType = 'documentType';
const levelId = 'levelId';
const year = 'year';

export const UniversityDocumentApiBody =
  (file = 'file'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      type: 'multipart/form-data',
      required: true,
      schema: {
        type: 'object',
        properties: {
          [name]: {
            type: 'string',
            nullable: true,
          },
          [alt]: {
            type: 'string',
            nullable: true,
            example: alt,
          },
          [documentType]: {
            type: 'enum',
            nullable: false,
            enum: [
              UniversityDocTypeEnum.BROCHURE,
              UniversityDocTypeEnum.PROSPECTUS,
              UniversityDocTypeEnum.COURSE_GUIDE,
            ],
          },
          [levelId]: {
            type: 'number',
            nullable: true,
            description: 'validate if document type is COURSE GUIDE',
          },
          [year]: {
            type: 'string',
            nullable: true,
            description: 'validate if document type is BROCHURE',
          },
          [file]: {
            type: 'string',
            format: 'binary',
            nullable: false,
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
