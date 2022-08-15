export const TYPEORM_CONNECTION_NAMES = {
  DEFAULT: 'default',
} as const;
export type TypeOrmConnectionName =
  typeof TYPEORM_CONNECTION_NAMES[keyof typeof TYPEORM_CONNECTION_NAMES];
