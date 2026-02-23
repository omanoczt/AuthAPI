import UserModel from "../database/models/User";
import { hashPassword } from "../internal/cryptHandle";
import noError from "../internal/error/noError";
import unknownError from "../internal/error/unknownError";
import user_existsError from "../internal/error/user_existsError";
import user_not_foundError from "../internal/error/user_not_foundError";
import resulter from "../internal/resulter";
import Result from "../types/Result";
import { UserOutputDTO, UserUpdateDTO } from "../types/UserDTO";

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

  async update(userid: string, data: UserUpdateDTO): Promise<Result<UserOutputDTO>> {
    try{
      const updatedUser = await UserModel.findOneAndUpdate({id: userid}, {
        $set: data
      }, {returnDocument: 'after'});

      if(!updatedUser) {
        return resulter(false, user_not_foundError);
      }

      const output = updatedUser.toObject() as UserOutputDTO;
      return resulter(true, noError, output);

    }catch(error: any){
      if(error.code === 11000) {
        return resulter(false, user_existsError);
      }

      return resulter(false, unknownError);
    }
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

  async setPassword(identifier: string, newPassword: string): Promise<Result<{}>> { 
    try{
      const hashedPassword = await hashPassword(newPassword);
      const user = await UserModel.findOneAndUpdate(
        {
          $or: [
            {id: identifier},
            {username: identifier}
          ]
        },
        {
          password: hashedPassword
        }
      );
  
      if(!user) {
        return resulter(false, user_not_foundError);
      }
  
      return resulter(true, noError, {});
    } catch(error: any) {
      return resulter(false, unknownError);
    }
  }

}