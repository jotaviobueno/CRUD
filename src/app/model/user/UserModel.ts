import { Schema, model} from 'mongoose';
import {UserInterface} from '../../interfaces/UserInterface';

interface UserInterfaceModel extends UserInterface {

    created_in?: number,
    update_at?: number,
    deleted_at?: number,

}

const userSchema = new Schema <UserInterfaceModel> ({

    client_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created_in: { type: Date, required: true },
    update_at: { type: Date, required: true },
    deleted_at: { type: Date},

});

const UserModel = model<UserInterfaceModel>('User', userSchema);

export default UserModel;
