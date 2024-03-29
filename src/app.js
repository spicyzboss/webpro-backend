import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import {
  getUser, payment, verifyPayment, getChat, refreshToken, getPostById, getGroupChat, getAdmin, getBlacklists, getReport,
} from './services/authenticated';
import auth from './middlewares/auth';
import {
  register, login, mailVerification, createPost, findPost, reportUser, addToBlacklists, addFriend, editProfile, checkEmail, getInterest, getIdbyPost,
  getPostData,
  getProfileById,
  addmemberInterest,
  getUsameInt,
  getIntById,
  removeBlacklist,
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

app.get('/refresh', auth, refreshToken);

app.post('/payment/verify', auth, verifyPayment);

app.get('/chat', auth, getChat);

app.post('/login', login);

app.post('/register', upload.single('profile_image'), register);

app.get('/verify', mailVerification);

app.post('/post', auth, createPost);

app.post('/find_post', auth, findPost);

app.post('/report', auth, reportUser);

app.post('/ban', auth, addToBlacklists);

app.post('/add_match', auth, addFriend);

app.put('/edit_profile', auth, editProfile);

app.post('/check_email', auth, checkEmail);

app.get('/get_interest', auth, getInterest);

app.post('/get_idbypost', auth, getIdbyPost);

app.get('/get_postdata', auth, getPostData);

app.post('/get_profilebyid', auth, getProfileById);

app.post('/add_memberinterest', auth, addmemberInterest);

app.post('/get_usameint', auth, getUsameInt);

app.get('/get_postbid/:id', auth, getPostById);

app.post('/get_intbyid', auth, getIntById);

app.get('/get_groupChat/:id', auth, getGroupChat);

app.get('/get_admin', auth, getAdmin);

app.get('/get_blacklists', auth, getBlacklists);

app.delete('/blacklist/:id', auth, removeBlacklist);

app.get('/reports', auth, getReport);

export default app;
