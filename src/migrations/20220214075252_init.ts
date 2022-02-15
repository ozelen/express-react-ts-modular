import { Knex } from 'knex';
import { db } from '@zelen.uk/models/db';

const uuidGenerationRaw = db.client.config.client === 'sqlite' ? 
  `(lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))` :
  `uuid_generate_v4()`;

  export async function up(knex: Knex): Promise<void> {
  db.schema.createTable('users', function (table) {
    table.uuid('id').primary().defaultTo(db.raw(uuidGenerationRaw));
    table.string('full_name', 255).notNullable();
    table.string('password', 127).notNullable();
    table.string('email', 127).notNullable();
  })
  .then(() => console.log('USERS: table created'))
  .catch(e => console.log('USERS: cannot create table', e))
}

export async function down(knex: Knex): Promise<void> {
  db.schema.dropTable('users');
}
