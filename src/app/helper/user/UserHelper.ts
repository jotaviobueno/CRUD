// Models
import UserModel from '../../model/user/UserModel'

import bcrypt from 'bcrypt';

class UserHelper {

    async existEmail (email: string) {
        const findUser: any = await UserModel.findOne({email: email, deleted_at: null});

        if (findUser === null)
            return false;

        return findUser;
    }

    async comparePassword (password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }
}

export default new UserHelper();
