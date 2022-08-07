// Models
import UserModel from '../../model/user/UserModel';
import LoginModel from '../../model/user/LoginModel';

import bcrypt from 'bcrypt';

class UserHelper {

    async existEmail (email: string) {
        const findUser: any = await UserModel.findOne({email: email, deleted_at: null});

        if (findUser === null)
            return false;

        return findUser;
    }

    async verifySession (session_id: any) {
        const findSession = await LoginModel.findOne({session_token: session_id, disconnected: null});

        if (findSession === null)
            return false;

        return findSession;
    }

    async comparePassword (password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }
}

export default new UserHelper();
