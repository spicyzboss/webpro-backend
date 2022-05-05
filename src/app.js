import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import {
  getUser, payment, verifyPayment, getChat,
} from './services/authenticated';
import auth from './middlewares/auth';
import {
  register, login, mailVerification, createPost, findPost, reportUser, addToBlacklists, addFriend, editProfile, checkEmail,

} from './services';

config();

const app = express();
const upload = multer({ dest: 'temp/' });

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/me', auth, getUser);

app.get('/payment', auth, payment);

app.post('/payment/verify', auth, verifyPayment);

app.get('/chat', auth, getChat);

app.post('/login', login);

app.post('/register', upload.single('profile_image'), register);

app.get('/verify', mailVerification);

app.post('/post', createPost);

app.get('/post', findPost);

app.post('/report', reportUser);

app.post('/ban', addToBlacklists);

app.post('/add_match', addFriend);

app.put('/edit_profile', editProfile);

app.post('/check_email', checkEmail);

export default app;
