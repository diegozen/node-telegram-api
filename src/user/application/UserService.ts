import { inject, injectable } from 'inversify';
import USER_IDENTIFIERS from '../domain/constants';
import { IUser } from '../domain/interfaces/IUser';
import { IUserRepository } from '../domain/interfaces/IUserRepository';

@injectable()
export class UserService {
    private repository: IUserRepository;

    constructor(@inject(USER_IDENTIFIERS.UserRepository) repository: IUserRepository) {
        this.repository = repository;
    }

    public async getAllUsers() {
        return await this.repository.getUsers();
    }
    public async getUserByTelegramId(telegramId: number) {
        return await this.repository.getUserByTelegramId(telegramId);
    }
    public async findOrCreateUserByTelegramId(
        telegramId: number,
        username: string,
        firstName: string,
        lastName: string
    ) {
        const user = await this.repository.getUserByTelegramId(telegramId);
        if (!user) {
            const newUser = await this.repository.createUserFromTelegram(telegramId, username, firstName, lastName);
            return { user: newUser, isNew: true };
        }
        return { user, isNew: false };
    }
}
