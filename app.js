import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import { register, login } from './services';

config();

const app = express();

app.use(bodyParser.json());

app.post('/login', login);

app.post('/register', register);

export default app;
