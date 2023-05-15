import 'dotenv/config';

const { env } = process;

type ConfigValue = string | undefined;

interface Config {
    [key: string]: ConfigValue;
};

interface AppConfig extends Config {
    port: ConfigValue;
};

export const appConfig: AppConfig = {
    port: env.APP_PORT
};