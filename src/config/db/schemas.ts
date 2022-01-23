import Knex from 'knex';
import { Model } from 'objection';
import config from './knexfile';

const knexConfig = Knex(config);

Model.knex(knexConfig);

export default Model;
