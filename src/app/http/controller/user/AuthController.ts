// repository
import repository from '../../repository/user/AuthRepository';

// Helpers
import UserHelper from '../../../helper/user/UserHelper';
import responseHelper from '../../../helper/ResponseHelper'

import {Response, Request} from 'express';

class Auth {

    async changeName (req: Request, res: Response) {
        const {session_id} = req.headers;
        const {password, new_name} = req.body;

        const sessionInfo = await UserHelper.verifySession(session_id);

        if (! sessionInfo)
            return await responseHelper.badRequest(res, {error: 'your session its not valid.'});

        const UserInfo = await UserHelper.existEmail(sessionInfo.email);

        if (! UserInfo)
            return await responseHelper.badRequest(res, {error: 'email not found.'});

        if (new_name === UserInfo.client_name)
            return await responseHelper.unprocessableEntity(res, {error: 'name cannot be the same as the account.'});

        if (! await UserHelper.comparePassword(password, UserInfo.password))
            return await responseHelper.notAuthorized(res, {error: 'invalid credentials.'});

        if (await repository.changeName(new_name, UserInfo.email)) {

            await repository.createLog(new_name, UserInfo.email);

            return await responseHelper.success(res, {success: 'name changed.'});
        }

        return await responseHelper.unprocessableEntity(res, {error: 'it was not possible to proceed'});
    }
}

export default new Auth();
