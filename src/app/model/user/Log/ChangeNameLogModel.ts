import { Schema, model} from 'mongoose';
import {ChangeNameInterface} from '../../../interfaces/UserInterface'

const ChangeNameSchema = new Schema <ChangeNameInterface> ({

    new_name: { type: String, required: true},
    email: { type: String, required: true },
    change_date: { type: Date }

});

const ChangeNameLog = model<ChangeNameInterface>('ChangeName', ChangeNameSchema);

export default ChangeNameLog;
