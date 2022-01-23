import { IGroup } from './IGroup';

export interface IGroupClient {
    isPendingUser(user: any): Promise<boolean>;
    addUserToGroup(userId: number): Promise<IGroup>;
    updateGroup(group: IGroup, params: any): Promise<void>;
}
