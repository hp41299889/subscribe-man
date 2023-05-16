import 'dotenv/config';
import * as IF from './interface';

const {env} = process;

export const appConfig: IF.AppConfig = {
  port: env.APP_PORT || 8000,
  debug: env.APP_DEBUG || 'true',
  environment: env.APP_ENVIRONMENT || 'develop',
};

export const postgresConfig: IF.PostgresConfig = {
  username: env.HUIHUI_POSTGRES_USER || 'postgres',
  password: env.HUIHUI_POSTGRES_PASSWORD || 'postgres',
  host: env.HUIHUI_POSTGRES_HOST || 'localhost',
  port: env.HUIHUI_POSTGRES_PORT || 5432,
  database: env.HUIHUI_POSTGRES_DB || 'postgres',
};
