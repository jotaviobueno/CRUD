import { Schema, model} from 'mongoose';
import {LoginInterface} from '../../interfaces/UserInterface';

interface LoginInterfaceModel extends LoginInterface {

    login_made_in?: number,
    disconnected?: number,

}

const LoginSchema = new Schema <LoginInterfaceModel> ({

    email: { type: String, required: true },
    session_token: { type: String, required: true },
    login_made_in: { type: Date, required: true },
    disconnected: { type: Date},

});

const LoginModel = model<LoginInterfaceModel>('Login', LoginSchema);

export default LoginModel;
