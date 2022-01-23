import { injectable } from 'inversify';
import { IBotRepository } from '../../../domain/interfaces/IBotRepository';
import { ITelegramUser } from '../../../domain/interfaces/ITelegramUser';
import bot from '../provider/BotProvider';

@injectable()
export class BotRepository implements IBotRepository {
    welcomeNewUser(chatId: number, user: ITelegramUser): void {
        const responseMessage = `
            Hola ${user.firstName}, encantado de conocerte 👋 \n¡Esto va a ser divertido!`;
        bot.sendMessage(chatId, responseMessage);
    }
    welcomeKnownUser(chatId: number, user: ITelegramUser): void {
        const responseMessage = `
        Hola de nuevo ${user.firstName} 😊`;
        bot.sendMessage(chatId, responseMessage);
    }
    replyNewFriendsCommand(chatId: number): void {
        const responseMessage = `
            ¡Guay! Te busco amigos nuevos y os abro un grupo. Te aviso cuando los tenga 😉 `;
        bot.sendMessage(chatId, responseMessage);
    }
    replyOldFriendsCommand(chatId: number): void {
        const responseMessage = `
            Estoy en ello, ten paciencia 🎋`;
        bot.sendMessage(chatId, responseMessage);
    }
    sendInvitationLink(user: ITelegramUser, invitationLink: string) {
        const message = `
        ${user.firstName}, te he encontrado un grupo que creo que te va a gustar. Puedes entrar clicando este link de invitación:\n${invitationLink}\n\n¡Que lo pases bien!`;
        bot.sendMessage(user.telegramId, message);
    }
}
