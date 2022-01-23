import { inject, injectable } from 'inversify';
import GROUP_IDENTIFIERS from '../domain/constants';
import { IGroup } from '../domain/interfaces/IGroup';
import { IGroupRepository } from '../domain/interfaces/IGroupRepository';

@injectable()
export class GroupService {
    private repository: IGroupRepository;

    constructor(@inject(GROUP_IDENTIFIERS.GroupRepository) repository: IGroupRepository) {
        this.repository = repository;
    }

    public async assignGroup(userId: number) {
        const activeGroups = await this.repository.getActiveGroups();
        let group = activeGroups.length ? activeGroups[0] : await this.repository.createGroup({ active: true });
        group = await this.repository.addUsersToGroup(group.id, [userId]);
        if (this.isGroupSet(group)) {
            group = await this.repository.updateGroup(group.id, { active: false });
        }
        group = await this.repository.getGroupWithUsers(group.id);
        return group;
    }

    public async isUserInActiveGroup(userId: number) {
        const users = await this.repository.findUserInGroups(userId, { active: true });
        return !!users.length;
    }

    public async updateGroup(group: IGroup, params: any) {
        await this.repository.updateGroup(group.id, params);
    }

    public async getActiveGroups() {
        return await this.repository.getActiveGroups();
    }

    private isGroupSet(group: IGroup): boolean {
        const members = group.users || [];
        return members.length > 1;
    }
}
