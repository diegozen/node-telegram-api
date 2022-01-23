import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('users', (t) => {
        t.bigInteger('telegramId').alter();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('users', (t) => {
        t.integer('telegramId').alter();
    });
}
