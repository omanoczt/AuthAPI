import { Request, Response } from "express";
import { UserService } from "../../../services/user/UserService";
import resulter from "../../../internal/resulter";
import invalid_requestError from "../../../internal/error/invalid_requestError";

export default async (req: Request, res: Response) => {
  const { identifier } = req.params;

  if(!identifier) {
    res.status(400).json(resulter(false, invalid_requestError));
    return;
  }

  const userService = new UserService();

  const userCreationResponse = await userService.get(identifier.toString());

  return res.status(202).json(userCreationResponse);
}