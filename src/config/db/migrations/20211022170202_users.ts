import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (t) => {
        t.increments('id');
        t.string('username');
        t.string('email');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}
