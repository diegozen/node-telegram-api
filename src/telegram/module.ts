import { friends } from './infastructure/bot/commands/Friends';
import { start } from './infastructure/bot/commands/Start';
import client from './infastructure/client/provider/ClientProvider';

class TelegramModule {
    async init() {
        await client.connectAndLogin();
        console.log('Client Created');
        start.init();
        friends.init();
    }
}

export const telegramModule = new TelegramModule();
