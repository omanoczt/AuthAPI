import { Request, Response } from "express";
import resulter from "../../../internal/resulter";
import invalid_requestError from "../../../internal/error/invalid_requestError";
import { UserService } from "../../../services/user/UserService";
import { UserOutputDTO, UserUpdateDTO, UserUpdateSchema } from "../../../types/UserDTO";
import unknownError from "../../../internal/error/unknownError";

export default async (req: Request, res: Response) => {
  const { userid } = req.params;
  
  if(!userid) {
    res.status(400).json(resulter(false, invalid_requestError));
    return;
  }

  const UpdateDataParsed = UserUpdateSchema.safeParse(req.body);
  if(!UpdateDataParsed.success) {
    return res.status(400).json(resulter(false, unknownError));
  }

  const data = UpdateDataParsed.data as UserOutputDTO;

  const service = new UserService();

  const response = await service.update(userid.toString(), data);

  return res.status(201).json(response);
}