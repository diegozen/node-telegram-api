import container from '../../../../config/ioc/installer';
import { GroupClient } from '../../../../group/infrastructure/client/GroupClient';
import { UserClient } from '../../../../user/infrastructure/client/UserClient';
import { TelegramService } from '../../../application/TelegramService';
import { IBotCommand } from '../../../domain/interfaces/IBotCommand';
import bot from '../provider/BotProvider';

class Friends implements IBotCommand {
    private telegramService: TelegramService;
    private userClient: UserClient;
    private groupClient: GroupClient;
    constructor() {
        this.telegramService = container.resolve<TelegramService>(TelegramService);
        this.userClient = container.resolve<UserClient>(UserClient);
        this.groupClient = container.resolve<GroupClient>(GroupClient);
    }
    init() {
        bot.onText(/\/friends/, async (msg) => {
            const chatId = msg.chat.id;

            const user = await this.userClient.findUser(chatId);
            const isPendingUser = await this.groupClient.isPendingUser(user.id);
            this.telegramService.replyAtFriendsCommand(chatId, isPendingUser);
            const group = await this.groupClient.addUserToGroup(user.id);
            if (group.active) return;

            const telegramGroupId = await this.telegramService.setTelegramGroup();
            await this.groupClient.updateGroup(group, { telegramId: telegramGroupId });
            const telegramGroupUsers = group.users ?? [];
            this.telegramService.sendInvitationToTelegramUsers(telegramGroupId, telegramGroupUsers);
        });
    }
}

export const friends = new Friends();
