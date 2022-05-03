import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
  getUser, payment, verifyPayment, chat,
} from './services/authenticated';
import auth from './middlewares/auth';
import {
  register, login, mailVerification, createPost, findPost, reportUser, addToBlacklists,
} from './services';

config();

const app = express();

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true,
}));

app.use(bodyParser.json());

app.get('/me', auth, getUser);

app.post('/payment', auth, payment);

app.post('/payment/verify', auth, verifyPayment);

app.post('/chat', auth, chat);

app.post('/login', login);

app.post('/register', register);

app.get('/verify', mailVerification);

app.post('/post', createPost);

app.get('/post', findPost);

app.post('/report', reportUser);

app.post('/ban', addToBlacklists);

export default app;
