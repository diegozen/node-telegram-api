import container from '../../../../config/ioc/installer';
import { UserClient } from '../../../../user/infrastructure/client/UserClient';
import { TelegramService } from '../../../application/TelegramService';
import { IBotCommand } from '../../../domain/interfaces/IBotCommand';
import bot from '../provider/BotProvider';

class Start implements IBotCommand {
    private telegramService: TelegramService;
    private userClient: UserClient;
    constructor() {
        this.telegramService = container.resolve<TelegramService>(TelegramService);
        this.userClient = container.resolve<UserClient>(UserClient);
    }
    init() {
        bot.onText(/\/start/, async (msg) => {
            if (msg.from) {
                const chatId = msg.chat.id;
                const userParams = {
                    telegramId: msg.from.id,
                    username: msg.from.username || '',
                    firstName: msg.from.first_name,
                    lastName: msg.from.last_name || ''
                };
                const { user, isNew } = await this.userClient.findOrCreateUser(
                    userParams.telegramId,
                    userParams.username,
                    userParams.firstName,
                    userParams.lastName
                );
                this.telegramService.welcomeUser(chatId, user, isNew);
            }
        });
    }
}

export const start = new Start();
