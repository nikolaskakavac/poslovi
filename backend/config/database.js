import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME + '_test',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: (...args) => console.log(args),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
      evict: 15000
    },
    dialectOptions: {
      ssl: process.env.DATABASE_URL && (process.env.DATABASE_URL.includes('render.com') || process.env.DATABASE_URL.includes('supabase.co'))
        ? {
            require: true,
            rejectUnauthorized: false
          }
        : false,
      connectTimeoutMillis: 15000,
      statement_timeout: 15000,
      keepalives: 1,
      keepalives_idle: 30
    }
  }
  
};
