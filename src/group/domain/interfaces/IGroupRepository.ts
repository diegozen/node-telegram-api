import { IGroup } from './IGroup';
import { IGroupUser } from './IGroupUser';

export interface IGroupRepository {
    createGroup(params: any): Promise<IGroup>;
    updateGroup(id: number, params: any): Promise<IGroup>;
    findUserInGroups(userId: number, groupSearchParams: any): Promise<IGroupUser[]>;
    addUsersToGroup(groupId: number, userIds: number[]): Promise<IGroup>;
    getActiveGroups(): Promise<IGroup[]>;
    getGroupWithUsers(groupId: number): Promise<IGroup>;
}
