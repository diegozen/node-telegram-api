import { ITelegramUser } from './ITelegramUser';

export interface IBotRepository {
    welcomeNewUser(chatId: number, user: ITelegramUser): void;
    welcomeKnownUser(chatId: number, user: ITelegramUser): void;
    replyNewFriendsCommand(chatId: number): void;
    replyOldFriendsCommand(chatId: number): void;
    sendInvitationLink(user: ITelegramUser, invitationLink: string): void;
}
