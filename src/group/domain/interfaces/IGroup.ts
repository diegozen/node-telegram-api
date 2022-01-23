import { IGroupUser } from './IGroupUser';

export interface IGroup {
    id: number;
    telegramId: number;
    active: boolean;
    users?: IGroupUser[];
}
