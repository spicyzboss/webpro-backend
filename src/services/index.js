import login from './login';
import register from './register';
import mailVerification from './verification';
import addFriend from './match';
import { createPost, findPost } from './post';
import { reportUser, addToBlacklists } from './ban';

export {
  login, register, mailVerification, createPost, findPost, reportUser, addToBlacklists, addFriend,
};
