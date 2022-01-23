import { injectable } from 'inversify';
import container from '../../../config/ioc/installer';
import { GroupService } from '../../application/GroupService';
import { IGroup } from '../../domain/interfaces/IGroup';
import { IGroupClient } from '../../domain/interfaces/IGroupClient';

@injectable()
export class GroupClient implements IGroupClient {
    private groupService: GroupService;
    constructor() {
        this.groupService = container.resolve<GroupService>(GroupService);
    }

    public async isPendingUser(userId: number) {
        return await this.groupService.isUserInActiveGroup(userId);
    }
    public async addUserToGroup(userId: number) {
        return await this.groupService.assignGroup(userId);
    }
    public async updateGroup(group: IGroup, params: any) {
        return await this.groupService.updateGroup(group, params);
    }
}
