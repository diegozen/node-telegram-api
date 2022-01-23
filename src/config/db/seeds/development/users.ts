import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del();

    // Inserts seed entries
    await knex('users').insert([
        { username: 'fodark', email: 'mock@email.com' },
        { username: 'john', email: 'mock2@email.com' },
        { username: 'david', email: 'mock3@email.com' }
    ]);
}
