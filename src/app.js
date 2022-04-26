import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import { register, login, mailVerification } from './services';

config();

const app = express();

app.use(bodyParser.json());

app.post('/login', login);

app.post('/register', register);

app.get('/verify', mailVerification);

export default app;
