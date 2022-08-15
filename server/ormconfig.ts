/* eslint-disable prettier/prettier */
export default {
  type: 'mysql',
  host: process.env.POSTGRES_DB_HOST,
  port: 3306,
  username: process.env.POSTGRES_DB_USER,
  password: process.env.POSTGRES_DB_PASSWORD,
  database: process.env.POSTGRES_DB,
  useUTC: true,
  // synchronize: false,
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber',
  },
};
