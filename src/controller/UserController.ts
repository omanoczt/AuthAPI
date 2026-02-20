import { Request, Response } from "express";
import create from "./modules/user/create";
import get from "./modules/user/get";

export default class UserController {
  private req: Request;
  private res: Response;
  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }
  async create(): Promise<void> {
    const { req, res } = this;
    await create(req, res);
    return;
  }

  async get(): Promise<void> {
    const { req, res } = this;
    await get(req, res);
    return;
  }
}