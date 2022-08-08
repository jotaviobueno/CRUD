import express from 'express';
export const router = express.Router();

import User from '../http/controller/user/UserController';
import Auth from '../http/controller/user/AuthController';

router.post('/register', User.storage);
router.post('/login', User.login);
router.get('/my-account', User.seeAccount);
router.post('/my-account/change-name', Auth.changeName);
router.delete('/my-account/delete', User.deleteAccount);
