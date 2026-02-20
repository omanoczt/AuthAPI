import { hashPassword } from "../../../internal/cryptHandle";
import password_boundsError from "../../../internal/error/password_boundsError";
import username_boundsError from "../../../internal/error/username_boundsError";
import generateID from "../../../internal/generateID";
import resulter from "../../../internal/resulter";
import UserRepository from "../../../repository/user.repository";
import { Limit } from "../../../types/Limit";
import Result from "../../../types/Result";
import { UserInputDTO, UserOutputDTO } from "../../../types/UserDTO";

export default async function create(data: UserInputDTO): Promise<Result<UserOutputDTO>> {
  if(data.username.length > Limit.MAX_USERNAME_LEN || data.username.length < Limit.MIN_USERNAME_LEN) {
    return resulter(false, username_boundsError);
  }

  if(data.password.length > Limit.MAX_PASSWORD_LEN || data.password.length < Limit.MIN_PASSWORD_LEN) {
    return resulter(false, password_boundsError);
  }

  const repository = new UserRepository();

  const newUserID = generateID();
  const hashedPass = await hashPassword(data.password);

  const response = await repository.create(newUserID, data.username, hashedPass);

  return response;
}