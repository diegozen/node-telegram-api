import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('users', (table) => {
        table.unique(['telegramId']);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('users', (table) => {
        table.dropUnique(['telegramId']);
    });
}
