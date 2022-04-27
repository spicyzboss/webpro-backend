import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { register, login, mailVerification } from './services';

config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/login', login);

app.post('/register', register);

app.get('/verify', mailVerification);

export default app;
