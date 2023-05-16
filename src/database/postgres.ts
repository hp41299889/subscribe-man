import {DataSource} from 'typeorm';

import {postgresConfig, appConfig} from '../config/config';

export const Postgres = new DataSource({
  type: 'postgres',
  host: postgresConfig.host,
  port: +postgresConfig.port,
  username: postgresConfig.username,
  password: postgresConfig.password,
  database: postgresConfig.database,
  entities: [],
  migrations: [],
  migrationsTableName: 'migrations',
  synchronize: appConfig.debug === 'true' ? true : false,
});
