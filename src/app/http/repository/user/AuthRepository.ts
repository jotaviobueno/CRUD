// Models
import UserModel from '../../../model/user/UserModel';
import ChangeNameLogModel from '../../../model/user/Log/ChangeNameLogModel';

class repository {

    async createLog (new_name: string, email: string) {
        await ChangeNameLogModel.create({
            new_name: new_name,
            email: email,
            change_date: new Date(),
        });
    }

    async changeName (new_name: string, email: string): Promise<boolean> {
        await UserModel.findOneAndUpdate({email: email, deleted_at: null}, {client_name: new_name, update_at: new Date()});

        return true;
    }
}

export default new repository();
