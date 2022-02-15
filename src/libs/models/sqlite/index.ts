import { postProcessResponse, wrapIdentifier } from '../helpers';

import knex from 'knex';

export const db = knex({
  client: 'sqlite',
  connection: {
    filename: process.env.SQLITE_DB || 'dev.sqlite3'
  },
  useNullAsDefault: true,
  postProcessResponse,
  wrapIdentifier
});
