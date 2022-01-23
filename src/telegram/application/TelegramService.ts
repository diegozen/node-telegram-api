import { inject, injectable } from 'inversify';
import TELEGRAM_IDENTIFIERS from '../domain/constants';
import { IBotRepository } from '../domain/interfaces/IBotRepository';
import { IClientRepository } from '../domain/interfaces/IClientRepository';
import { ITelegramUser } from '../domain/interfaces/ITelegramUser';

@injectable()
export class TelegramService {
    private botRepository: IBotRepository;
    private clientRepository: IClientRepository;

    constructor(
        @inject(TELEGRAM_IDENTIFIERS.BotRepository) botRepository: IBotRepository,
        @inject(TELEGRAM_IDENTIFIERS.ClientRepository) clientRepository: IClientRepository
    ) {
        this.botRepository = botRepository;
        this.clientRepository = clientRepository;
    }

    public welcomeUser(chatId: number, user: any, isNew: boolean) {
        if (isNew) return this.botRepository.welcomeNewUser(chatId, user);
        return this.botRepository.welcomeKnownUser(chatId, user);
    }

    public replyAtFriendsCommand(chatId: number, isPendingUser: boolean) {
        if (isPendingUser) return this.botRepository.replyOldFriendsCommand(chatId);
        return this.botRepository.replyNewFriendsCommand(chatId);
    }

    public async setTelegramGroup() {
        const telegramGroupId = await this.clientRepository.createEmptyGroup('supergrupo!');
        return telegramGroupId;
    }

    public async sendInvitationToTelegramUsers(telegramGroupId: number, users: ITelegramUser[]) {
        const invitationLink = await this.clientRepository.getInvitationLinks(telegramGroupId);
        for (let user of users) {
            this.botRepository.sendInvitationLink(user, invitationLink);
        }
    }
}
