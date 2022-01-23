import Model from '../../../../config/db/schemas';
import User from '../../../../user/infrastructure/db/model/User';

import { IGroup } from '../../../domain/interfaces/IGroup';

interface Group extends IGroup {}

class Group extends Model {
    static tableName = 'groups';

    telegramId!: number;
    active!: boolean;
    users?: User[];

    static get jsonSchema() {
        return {
            type: 'object',
            required: [],

            properties: {
                id: { type: 'integer' },
                telegramId: { type: 'number' },
                active: { type: 'boolean' }
            }
        };
    }

    static get relationMappings() {
        return {
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'groups.id',
                    // ManyToMany relation needs the `through` object
                    // to describe the join table.
                    through: {
                        // If you have a model class for the join table
                        // you need to specify it like this:
                        // modelClass: UserGroup,
                        from: 'users_groups.groupId',
                        to: 'users_groups.userId'
                    },
                    to: 'users.id'
                }
            }
        };
    }
}

export default Group;
