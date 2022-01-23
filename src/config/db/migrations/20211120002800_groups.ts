import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('groups', (t) => {
        t.increments('id');
        t.bigInteger('telegramId');
        t.boolean('active');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('groups');
}
