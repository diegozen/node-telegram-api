import { injectable } from 'inversify';
import { IUser } from '../../../domain/interfaces/IUser';
import { IUserRepository } from '../../../domain/interfaces/IUserRepository';
import User from '../model/User';

@injectable()
export class UserRepository implements IUserRepository {
    async getUsers(): Promise<IUser[]> {
        return await User.query();
    }
    async getUserByTelegramId(telegramId: number): Promise<IUser> {
        return await User.query().findOne({
            telegramId
        });
    }
    async createUserFromTelegram(
        telegramId: number,
        username: string,
        firstName: string,
        lastName: string
    ): Promise<IUser> {
        return await User.query().insert({
            username,
            telegramId,
            firstName,
            lastName
        });
    }
}
