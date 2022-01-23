import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users_groups', (t) => {
        t.increments('id');
        t.integer('userId').references('id').inTable('users').notNullable().onDelete('cascade');
        t.integer('groupId').references('id').inTable('groups').notNullable().onDelete('cascade');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users_groups');
}
