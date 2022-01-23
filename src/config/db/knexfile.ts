import Knex from 'knex';
import dotenv from 'dotenv';
import { knexSnakeCaseMappers } from 'objection';

dotenv.config({ path: '../../../.env' });

const environment = process.env.MODE || 'development';

console.log(`Using knex ${environment} config`);

const envConfig: { [name: string]: Knex.Config } = {
    test: {
        client: 'pg',
        connection: process.env.TEST_DB,
        migrations: {
            directory: __dirname + '/migrations'
        },
        seeds: {
            directory: __dirname + '/seeds/test'
        }
    },
    development: {
        client: 'pg',
        connection: process.env.DEV_DB,
        migrations: {
            directory: __dirname + '/migrations'
        },
        seeds: {
            directory: __dirname + '/seeds/development'
        }
    },
    production: {
        client: 'pg',
        connection: process.env.PRO_DB,
        migrations: {
            directory: __dirname + '/migrations'
        },
        seeds: {
            directory: __dirname + '/seeds/production'
        }
    }
};
const config = { ...envConfig[environment], ...knexSnakeCaseMappers() };

export default config;
