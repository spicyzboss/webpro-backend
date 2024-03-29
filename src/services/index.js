import login from './login';
import register from './register';
import mailVerification from './verification';
import addFriend from './match';
import { createPost, findPost } from './post';
import { reportUser, addToBlacklists, removeBlacklist } from './ban';
import editProfile from './profile';
import checkEmail from './checkEmail';
import getInterest from './getInterest';
import getIdbyPost from './getIdbyInterest';
import getPostData from './getPostData';
import getProfileById from './getProfileById';
import addmemberInterest from './addInterest';
import getUsameInt from './getUsersameInterest';
import getIntById from './getInterestById';

export {
  login, register, mailVerification, createPost, findPost, reportUser, addToBlacklists, addFriend, editProfile, checkEmail, getInterest, getIdbyPost, getPostData,
  getProfileById, addmemberInterest, getUsameInt, getIntById, removeBlacklist,
};
