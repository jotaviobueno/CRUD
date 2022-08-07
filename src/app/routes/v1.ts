import express from 'express';
export const router = express.Router();

import User from '../http/controller/user/UserController';

router.post('/register', User.storage);
router.post('/login', User.login);
router.get('/my-account', User.seeAccount);
