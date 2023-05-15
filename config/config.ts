import 'dotenv/config';

const { env } = process;

type ConfigValue = string | undefined;

interface Config {
    [key: string]: ConfigValue;
};

interface AppConfig extends Config {
    port: ConfigValue;
};

interface PostgresConfig extends Config {

};

export const appConfig: AppConfig = {
    port: env.APP_PORT
};

export const postgresConfig = {
    username: env.HUIHUI_POSTGRES_USER,
    password: env.HUIHUI_POSTGRES_PASSWORD,
    host: env.HUIHUI_POSTGRES_HOST,
    port: env.HUIHUI_POSTGRES_PORT || 5432,
    database: env.HUIHUI_POSTGRES_DB
};