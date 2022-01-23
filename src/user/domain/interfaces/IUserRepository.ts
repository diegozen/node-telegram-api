import { IUser } from './IUser';

export interface IUserRepository {
    getUsers(): Promise<IUser[]>;
    getUserByTelegramId(telegramId: number): Promise<IUser>;
    createUserFromTelegram(telegramId: number, username: string, firstName: string, lastName: string): Promise<IUser>;
}
