import Result from "../../types/Result";
import { UserInputDTO, UserOutputDTO, UserUpdateDTO } from "../../types/UserDTO";
import create from "./modules/create";
import { get } from "./modules/get";
import { update } from "./modules/update";

export class UserService {
  async create(data: UserInputDTO): Promise<Result<UserOutputDTO>> {
    const response = await create(data);
    return response;
  }

  async get(identifier: string): Promise<Result<UserOutputDTO>> {
    const response = await get(identifier);
    return response;
  }

  async update(identifier: string, data: UserUpdateDTO): Promise<Result<UserOutputDTO>> {
    const response = await update(identifier, data);
    return response;
  }
}