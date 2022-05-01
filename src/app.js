import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import {
  register, login, mailVerification, reportUser, addToBlacklists,
} from './services';

config();

const app = express();

app.use(bodyParser.json());

app.post('/login', login);

app.post('/register', register);

app.get('/verify', mailVerification);

app.post('/report', reportUser);

app.post('/ban', addToBlacklists);

export default app;
