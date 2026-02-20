import { Request, Response } from "express";
import { UserInputDTO, UserInputSchema } from "../../../types/UserDTO";
import { UserService } from "../../../services/user/UserService";
import resulter from "../../../internal/resulter";
import invalid_inputError from "../../../internal/error/invalid_inputError";

export default async (req: Request, res: Response) => {
  const requestBodyParsed = UserInputSchema.safeParse(req.body);
  
  if(!requestBodyParsed.success) {
    return res.status(400).json(resulter(false, invalid_inputError));
  }

  const userData: UserInputDTO = requestBodyParsed.data;

  const userService = new UserService();

  const userCreationResponse = await userService.create(userData);

  return res.status(202).json(userCreationResponse);
}