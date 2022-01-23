import { IUser } from './IUser';

export interface IUserClient {
    findOrCreateUser(
        telegramId: number,
        username: string,
        firstName: string,
        lastName: string
    ): Promise<{ user: IUser; isNew: boolean }>;
    findUser(telegramId: number): Promise<IUser>;
}
