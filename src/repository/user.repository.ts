import UserModel from "../database/models/User";
import noError from "../internal/error/noError";
import unknownError from "../internal/error/unknownError";
import user_existsError from "../internal/error/user_existsError";
import user_not_foundError from "../internal/error/user_not_foundError";
import resulter from "../internal/resulter";
import Result from "../types/Result";
import { UserOutputDTO } from "../types/UserDTO";

export default class UserRepository {
  async existsByUsername(username: string): Promise<boolean> {
    const exists = await UserModel.exists({username});
    return !!exists;
  }

  async create(id: string, username: string, hashedPassword: string): Promise<Result<UserOutputDTO>> {

    try {
      const newUser = await UserModel.create({
        id,
        username,
        password: hashedPassword
      });
  
      const UserData: UserOutputDTO = newUser.toObject();
  
      return resulter(true, noError, UserData);
    } catch (error: any) {
      if(error.code === 11000) {
        return resulter(false, user_existsError);
      }

      return resulter(false, unknownError);
    }
  }

  async get(indentifier: string): Promise<Result<UserOutputDTO>> {
    const user = await UserModel.findOne({
      $or: [
        {id: indentifier},
        {username: indentifier}
      ]
    });

    if(!user) {
      return resulter(false, user_not_foundError);
    }

    const UserData: UserOutputDTO = user.toObject();

    return resulter(true, noError, UserData);
  }

  async getById(id: string): Promise<Result<UserOutputDTO>> {
    const user = await UserModel.findOne({id});

    if(!user) {
      return resulter(false, user_not_foundError);
    }

    const UserData: UserOutputDTO = user.toObject();

    return resulter(true, noError, UserData);
  }

  async getByUsername(username: string): Promise<Result<UserOutputDTO>> {
    const user = await UserModel.findOne({username});

    if(!user) {
      return resulter(false, user_not_foundError);
    }

    const UserData: UserOutputDTO = user.toObject();

    return resulter(true, noError, UserData);
  }

  async setUsername(identifier: string, newUsername: string): Promise<Result<UserOutputDTO>> {
    try {
      const user = await UserModel.findOneAndUpdate(
        {
          $or: [
            {id: identifier},
            {username: identifier}
          ]
        },
        {
          username: newUsername
        },
        {
          new: true
        }
      );

      if(!user) {
        return resulter(false, user_not_foundError);
      }

      const UserData: UserOutputDTO = user.toObject();

      return resulter(true, noError, UserData);
    } catch (error: any) {
      if(error.code === 11000) {
        return resulter(false, user_existsError);
      }

      return resulter(false, unknownError);
    }
  }
}