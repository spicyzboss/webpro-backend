import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import {
  register, login, mailVerification, createPost, findPost,
} from './services';

config();

const app = express();

app.use(bodyParser.json());

app.post('/login', login);

app.post('/register', register);

app.get('/verify', mailVerification);

app.post('/post', createPost);

app.get('/post', findPost);

export default app;
