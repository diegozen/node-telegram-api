import TelegramBot from 'node-telegram-bot-api';
const token = process.env.TELEGRAM_BOT_API_KEY || '';

const bot = new TelegramBot(token, { polling: true });

export default bot;
