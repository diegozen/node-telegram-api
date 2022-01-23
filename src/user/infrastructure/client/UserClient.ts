import { injectable } from 'inversify';
import container from '../../../config/ioc/installer';
import { UserService } from '../../application/UserService';
import { IUserClient } from '../../domain/interfaces/IUserClient';

@injectable()
export class UserClient implements IUserClient {
    private userService: UserService;
    constructor() {
        this.userService = container.resolve<UserService>(UserService);
    }

    public async findOrCreateUser(telegramId: number, username: string, firstName: string, lastName: string) {
        return await this.userService.findOrCreateUserByTelegramId(telegramId, username, firstName, lastName);
    }
    public async findUser(telegramId: number) {
        return await this.userService.getUserByTelegramId(telegramId);
    }
}
