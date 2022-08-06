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

        const session_id = await repository.createSession(email);

        if (session_id)
            return await responseHelper.notAuthorized(res, {success: session_id.session_token});

        return await responseHelper.unprocessableEntity(res, {error: 'it was not possible to proceed'});
    }
}

export default new User();