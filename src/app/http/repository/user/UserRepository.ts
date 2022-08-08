// Models
import UserModel from '../../../model/user/UserModel';
import LoginModel from '../../../model/user/LoginModel';

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class repository {

    async create (client_name: string, email: string, password: string): Promise <boolean> {

        await UserModel.create({

            client_name: client_name,
            email: email,
            password: await bcrypt.hash(password, 10),
            created_in: new Date(),
            update_at: new Date(),
            deleted_at: null

        });

        return true;
    }

    async createSession (email: string): Promise <any> {

        return await LoginModel.create({
            email: email,
            session_token: uuidv4(),
            login_made_in: new Date(),
            disconnected: null,
        });
    }

    async seeAccount (email: string) {
        return await UserModel.findOne({email: email, deleted_at: null}).select({__v: 0, _id: 0, password: 0});
    }

    async deleteAllSession (email: string) {
        const findAllSession = await LoginModel.find({email: email, disconnected: null});

        findAllSession.forEach(async (session) => {
            await LoginModel.findOneAndUpdate({email: session.email}, {disconnected: new Date()});
        });
    }

    async deleteAccount (email: string): Promise<boolean> {
        await UserModel.findOneAndUpdate({email: email, deleted_at: null}, {deleted_at: new Date(), update_at: new Date()});

        return true;
    }
}

export default new repository();
