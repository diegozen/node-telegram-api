import express from 'express';
import cors from 'cors';
import router from './router';
import { telegramModule } from './telegram/module';

const app = express();

Promise.all([telegramModule.init()]);

app.use(express.json());
app.use(router);

// Add here your allowed domains
const whiteList: any = [];

const corsOptions = (req: any, callback: any) => {
    let corsOptions;

    let isDomainAllowed = whiteList.indexOf(req.header('Origin')) !== -1;

    if (isDomainAllowed) {
        // Enable CORS for this request
        corsOptions = { origin: true };
    } else {
        // Disable CORS for this request
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

app.use(cors(corsOptions));

app.set('port', process.env.PORT || 8080);

console.log(`Running in ${process.env.MODE} mode`);

app.listen(app.get('port'), () => {
    console.log(`Server started in http://localhost:${app.get('port')}`);
});
