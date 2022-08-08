// repository
import repository from '../../repository/user/UserRepository';

// helpers
import UserHelper from '../../../helper/user/UserHelper';
import responseHelper from '../../../helper/ResponseHelper';

import {Request, Response} from 'express';

class User {

    async storage (req: Request, res: Response) {
        const {client_name, email, password} = req.body;

        if (await UserHelper.existEmail(email) != false)
            return await responseHelper.badRequest(res, {error: 'email already registered in the database.'});

        if (await repository.create(client_name, email, password))
            return await responseHelper.created(res, {success: 'Email registered'});

        return await responseHelper.unprocessableEntity(res, {error: 'it was not possible to proceed'});
    }

    async login (req: Request, res: Response) {
        const {email, password} = req.body;

        const UserInfo = await UserHelper.existEmail(email);

        if (! UserInfo)
            return await responseHelper.badRequest(res, {error: 'email not found.'});

        if (! await UserHelper.comparePassword(password, UserInfo.password))
            return await responseHelper.notAuthorized(res, {error: 'invalid credentials'});

        const getSessionToken = await repository.createSession(email);

        if (getSessionToken)
            return await responseHelper.success(res, {session_token: getSessionToken.session_token});

        return await responseHelper.unprocessableEntity(res, {error: 'it was not possible to proceed'});
    }

    async seeAccount (req: Request, res: Response) {
        const {session_id} = req.headers;

        const sessionInfo = await UserHelper.verifySession(session_id);

        if (! sessionInfo)
            return await responseHelper.badRequest(res, {error: 'your session its not valid.'});

        const UserInfo = await UserHelper.existEmail(sessionInfo.email);

        if (! UserInfo)
            return await responseHelper.badRequest(res, {error: 'email not found.'});

        const getUserInformation = await repository.seeAccount(UserInfo.email);

        if (getUserInformation)
            return await responseHelper.success(res, {account_info: getUserInformation});

        return await responseHelper.unprocessableEntity(res, {error: 'it was not possible to proceed'});
    }

    async deleteAccount (req: Request, res: Response) {
        const {session_id} = req.headers;
        const {password} = req.body;

        const sessionInfo = await UserHelper.verifySession(session_id);

        if (! sessionInfo)
            return await responseHelper.badRequest(res, {error: 'your session its not valid.'});

        const UserInfo = await UserHelper.existEmail(sessionInfo.email);

        if (! UserInfo)
            return await responseHelper.badRequest(res, {error: 'email not found.'});

        if (! await UserHelper.comparePassword(password, UserInfo.password))
            return await responseHelper.notAuthorized(res, {error: 'invalid credentials.'});

        if (await repository.deleteAccount(UserInfo.email)) {

            await repository.deleteAllSession(UserInfo.email);

            return await responseHelper.success(res, {success: 'account deleted'});
        }

        return await responseHelper.unprocessableEntity(res, {error: 'it was not possible to proceed'});
    }
}

export default new User();
