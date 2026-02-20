import UserRepository from "../../../repository/user.repository";
import Result from "../../../types/Result";
import { UserOutputDTO } from "../../../types/UserDTO";

export async function get(indentifier: string): Promise<Result<UserOutputDTO>> {
  const repository = new UserRepository();

  let response = await repository.get(indentifier);

  return response;
}