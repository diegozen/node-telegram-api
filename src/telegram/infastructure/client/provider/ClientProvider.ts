import { Client } from 'tdl';
import { TDLib } from 'tdl-tdlib-addon';

const client = new Client(new TDLib(), {
    apiId: Number(process.env.TELEGRAM_API_ID), // Your api_id
    apiHash: process.env.TELEGRAM_API_HASH // Your api_hash
});

export default client;
