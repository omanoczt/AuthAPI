import { Schema, model } from "mongoose";
import type { HydratedDocument } from "mongoose";
import UserData from "../../types/UserData";
import { Limit } from "../../types/Limit";

type UserDocument = HydratedDocument<UserData>;

const userSchema = new Schema<UserDocument>({
  id: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true, minLength: Limit.MIN_PASSWORD_LEN, maxLength: Limit.MAX_USERNAME_LEN, 
    set: (value: string) => value.toLowerCase().replace(/\s+/g, '')
  },
  password: { type: String, required: true },
  deleted: { type: Boolean, default: false }
}, {timestamps: true});

userSchema.set('toObject', {
  transform: (_, ret) => {
    const {password, _id, __v, ...rest} = ret;
    return rest;
  }
})

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;