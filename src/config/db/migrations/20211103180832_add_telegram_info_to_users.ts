import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('users', (table) => {
        table.string('first_name');
        table.string('last_name');
        table.integer('telegram_id');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('users', (table) => {
        table.dropColumns('first_name', 'last_name', 'telegram_id');
    });
}
