import { injectable } from 'inversify';
import { IUser } from '../../../../user/domain/interfaces/IUser';
import { IClientRepository } from '../../../domain/interfaces/IClientRepository';
import client from '../provider/ClientProvider';

@injectable()
export class ClientRepository implements IClientRepository {
    async createEmptyGroup(title: string) {
        const chat = await this.createSupergroup(title);
        await this.hideCreator(chat.id);
        await this.getBot();
        await this.addBot(chat.id);
        return chat.id;
    }
    async getInvitationLinks(telegramGroupId: number) {
        const chatInviteLink = await client.invoke({
            _: 'generateChatInviteLink',
            chat_id: telegramGroupId
        });
        return chatInviteLink.invite_link;
    }

    private async createSupergroup(title: string) {
        return await client.invoke({
            _: 'createNewSupergroupChat',
            title: title,
            is_channel: false
        });
    }
    private async getBot() {
        await client
            .invoke({
                _: 'getUser',
                user_id: Number(process.env.TELEGRAM_GROUP_BOT_ID)
            })
            .catch((err: any) => console.log(err));
    }
    private async hideCreator(chatId: number) {
        await client
            .invoke({
                _: 'setChatMemberStatus',
                chat_id: chatId,
                user_id: Number(process.env.TELEGRAM_ADMIN_USER),
                status: {
                    _: 'chatMemberStatusCreator',
                    custom_title: 'master',
                    is_anonymous: true,
                    is_member: true
                }
            })
            .catch((err: any) => console.log(err));
    }
    private async addBot(chatId: number) {
        await client
            .invoke({
                _: 'addChatMember',
                chat_id: chatId,
                user_id: Number(process.env.TELEGRAM_GROUP_BOT_ID)
            })
            .catch((err: any) => console.log(err));
    }
}
