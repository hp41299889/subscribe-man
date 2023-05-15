import { DataSource } from "typeorm";

import { postgresConfig } from "config/config";

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
    synchronize: true
});