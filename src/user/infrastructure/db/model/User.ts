import Model from '../../../../config/db/schemas';
import { IUser } from '../../../domain/interfaces/IUser';

interface User extends IUser {}

class User extends Model {
    static tableName = 'users';

    username!: string;
    telegramId!: number;
    firstName!: string;
    lastName!: string;

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['telegramId'],

            properties: {
                id: { type: 'integer' },
                telegramId: { type: 'number' },
                firstName: { type: 'string', minLength: 1, maxLength: 255 },
                lastName: { type: 'string', minLength: 1, maxLength: 255 },
                username: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: ['string', 'null'], minLength: 1, maxLength: 255 }
            }
        };
    }
}

export default User;
