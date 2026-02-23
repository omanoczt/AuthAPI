import invalid_requestError from "../../../internal/error/invalid_requestError";
import resulter from "../../../internal/resulter";
import UserRepository from "../../../repository/user.repository";
import Result from "../../../types/Result";
import { UserOutputDTO, UserUpdateDTO, UserUpdateSchema } from "../../../types/UserDTO";

export async function update(userid: string, data: UserUpdateDTO): Promise<Result<UserOutputDTO>> {
  const repository = new UserRepository();

  const cleanData = UserUpdateSchema.parse(data);
  
  const updateQuery: Partial<UserUpdateDTO> = {};

  if(cleanData.username) {
    updateQuery.username = cleanData.username;
  }

  if(cleanData.password) {
    updateQuery.password = cleanData.password;
  }

  if(Object.keys(updateQuery).length === 0) {
    return resulter(false, invalid_requestError);
  }

  const response = await repository.update(userid, updateQuery);

  return response;
}