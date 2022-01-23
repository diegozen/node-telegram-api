import { injectable } from 'inversify';
import { IGroupRepository } from '../../../domain/interfaces/IGroupRepository';
import Group from '../model/Group';

@injectable()
export class GroupRepository implements IGroupRepository {
    async createGroup(params: any) {
        return await Group.query().insert(params);
    }

    async updateGroup(id: number, params: any) {
        return await Group.query().patchAndFetchById(id, params);
    }

    async addUsersToGroup(groupId: number, userIds: number[]) {
        let group = await this.getGroupWithUsers(groupId);
        await group.$relatedQuery('users').relate(userIds);
        group = await this.getGroupWithUsers(groupId);
        return group;
    }

    async findUserInGroups(userId: number, groupSearchParams: any) {
        const groupsSubQuery = Group.query().where(groupSearchParams);
        return await Group.relatedQuery('users').for(groupsSubQuery).where({ user_id: userId });
    }

    async getActiveGroups() {
        return await Group.query().where({ active: true });
    }

    async getGroupWithUsers(id: number) {
        return await Group.query().findById(id).withGraphFetched('users');
    }
}
