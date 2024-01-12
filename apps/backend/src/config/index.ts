import dotenv from 'dotenv';
import env from 'env-var';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // this error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const CONFIG = {
  node: env.get('NODE_ENV').default('development').asString(),
  isProduction: env.get('NODE_ENV').default('development').asString() === 'production',
  isTest: env.get('NODE_ENV').default('development').asString() === 'test',
  isDevelopment: env.get('NODE_ENV').default('development').asString() === 'development',

  app: {
    port: env.get('SERVER_PORT').asPortNumber() || 3001
  },
  client: {
    url: env.get('CLIENT_URL').required().asString()
  },
  log: {
    level: env.get('LOG_LEVEL').asString() || 'debug',
    enable: env.get('LOG_ENABLE').asBool() || true
  },
  auth: {
    clientId: env.get('CLIENT_ID').required().asString(),
    clientSecret: env.get('CLIENT_SECRET').required().asString(),
    cookieSecret: env.get('COOKIE_SECRET').required().asString()
  },
  database: {
    host: env.get('DATABASE_HOST').required().asString(),
    port: env.get('DATABASE_PORT').required().asPortNumber(),
    username: env.get('DATABASE_USERNAME').required().asString(),
    password: env.get('DATABASE_PASSWORD').required().asString(),
    name: env.get('DATABASE_NAME').required().asString()
  },

  // app: {
  //   name: getOsEnv('APP_NAME'),
  //   version: (pkg as any).version,
  //   description: (pkg as any).description,
  //   host: getOsEnv('APP_HOST'),
  //   schema: getOsEnv('APP_SCHEMA'),
  //   routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
  //   port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
  //   banner: toBool(getOsEnv('APP_BANNER')),
  //   dirs: {
  //       migrations: getOsPaths('TYPEORM_MIGRATIONS'),
  //       migrationsDir: getOsPath('TYPEORM_MIGRATIONS_DIR'),
  //       entities: getOsPaths('TYPEORM_ENTITIES'),
  //       entitiesDir: getOsPath('TYPEORM_ENTITIES_DIR'),
  //       controllers: getOsPaths('CONTROLLERS'),
  //       middlewares: getOsPaths('MIDDLEWARES'),
  //       interceptors: getOsPaths('INTERCEPTORS'),
  //       subscribers: getOsPaths('SUBSCRIBERS'),
  //       resolvers: getOsPaths('RESOLVERS'),
  //   },
  // },
  // log: {
  //     level: getOsEnv('LOG_LEVEL'),
  //     json: toBool(getOsEnvOptional('LOG_JSON')),
  //     output: getOsEnv('LOG_OUTPUT'),
  // },
  // db: {
  //     type: getOsEnv('TYPEORM_CONNECTION'),
  //     host: getOsEnvOptional('TYPEORM_HOST'),
  //     port: toNumber(getOsEnvOptional('TYPEORM_PORT')),
  //     username: getOsEnvOptional('TYPEORM_USERNAME'),
  //     password: getOsEnvOptional('TYPEORM_PASSWORD'),
  //     database: getOsEnv('TYPEORM_DATABASE'),
  //     synchronize: toBool(getOsEnvOptional('TYPEORM_SYNCHRONIZE')),
  //     logging: getOsEnv('TYPEORM_LOGGING'),
  // },
  // graphql: {
  //     enabled: toBool(getOsEnv('GRAPHQL_ENABLED')),
  //     route: getOsEnv('GRAPHQL_ROUTE'),
  //     editor: toBool(getOsEnv('GRAPHQL_EDITOR')),
  // },
  // swagger: {
  //     enabled: toBool(getOsEnv('SWAGGER_ENABLED')),
  //     route: getOsEnv('SWAGGER_ROUTE'),
  //     username: getOsEnv('SWAGGER_USERNAME'),
  //     password: getOsEnv('SWAGGER_PASSWORD'),
  // },
  // monitor: {
  //     enabled: toBool(getOsEnv('MONITOR_ENABLED')),
  //     route: getOsEnv('MONITOR_ROUTE'),
  //     username: getOsEnv('MONITOR_USERNAME'),
  //     password: getOsEnv('MONITOR_PASSWORD'),
  // },

  /**
   * API configs
   */
  api: {
    prefix: '/api'
  }
};

export default CONFIG;
